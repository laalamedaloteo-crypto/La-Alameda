const Lot = require('../models/Lot');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

/**
 * Utilidad de Sincronización Híbrida Automática.
 * 
 * Basado en las reglas de negocio decididas:
 * 1. El desarrollador (JSON) manda en la existencia de los lotes y los polígonos.
 * 2. El administrador (DB) manda en los datos comerciales (precios, áreas, estados).
 */
async function syncLots() {
    try {
        const lotsJsonPath = path.join(__dirname, '../../../frontend/src/assets/data/lots.json');
        
        if (!fs.existsSync(lotsJsonPath)) {
            console.warn('⚠️ No se encontró el archivo lots.json para sincronizar.');
            return;
        }

        const lotsData = JSON.parse(fs.readFileSync(lotsJsonPath, 'utf8'));
        const jsonIds = lotsData.map(l => l.id);

        console.log(`--- Iniciando Sincronización Automática (${lotsData.length} lotes) ---`);

        // 1. ELIMINACIÓN: Borrar lotes de la DB que ya no están en el JSON
        const deletedCount = await Lot.destroy({
            where: {
                id: {
                    [Op.notIn]: jsonIds
                }
            }
        });
        if (deletedCount > 0) {
            console.log(`🗑️ Se eliminaron ${deletedCount} lotes de la DB que ya no estaban en el JSON.`);
        }

        // 2. CREACIÓN Y ACTUALIZACIÓN (UPSERT INTELIGENTE)
        for (const lot of lotsData) {
            const [existingLot, created] = await Lot.findOrCreate({
                where: { id: lot.id },
                defaults: {
                    code: lot.code,
                    areaM2: lot.areaM2 || 1250,
                    priceUsd: lot.priceUsd || 0,
                    status: lot.status || 'AVAILABLE',
                    polygon: lot.polygon || [],
                    description: lot.description || '',
                    extraData: lot.extraData || {}
                }
            });

            if (created) {
                console.log(`➕ Lote creado: ${lot.id}`);
            } else {
                // Si ya existe, SOLO actualizamos el polígono y el código (si cambió)
                // NO tocamos ni precio ni área ni estado ni descripción (lo maneja el admin)
                const needsUpdate = JSON.stringify(existingLot.polygon) !== JSON.stringify(lot.polygon) || 
                                    existingLot.code !== lot.code;

                if (needsUpdate) {
                    await existingLot.update({
                        code: lot.code,
                        polygon: lot.polygon || []
                    });
                    console.log(`🔄 Polígono actualizado para lote: ${lot.id}`);
                }
            }
        }

        console.log('--- Sincronización completada con éxito ---');
    } catch (error) {
        console.error('❌ Error crítico en sync-lots:', error);
        throw error; // Lanzamos el error para que index.js pueda manejarlo
    }
}

module.exports = syncLots;
