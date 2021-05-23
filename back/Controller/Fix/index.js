const Penjualan_Header = require('../../Model/Penjualan/penjualan_header');
const { sequelize } = require('../../Database/db');
const Penjualan_Detail = require('../../Model/Penjualan/penjualan_detail');
const Penjualan_Service = require('../../Model/Penjualan/penjualan_service');
const Pesanan_Pembelian_Detail = require('../../Model/Pesanan_Pembelian/pesanan_pembelian_detail');
const Pesanan_Pembelian_Header = require('../../Model/Pesanan_Pembelian/pesanan_pembelian_header');
const Pembelian_Header = require('../../Model/Pembelian/pembelian_header');
const Pembelian_Detail = require('../../Model/Pembelian/pembelian_detail');
const Penyesuaian_Detail = require('../../Model/Penyesuaian/penyesuaian_detail');
const Penyesuaian_Header = require('../../Model/Penyesuaian/penyesuaian_header');
const Retur_Pembelian_Detail = require('../../Model/Retur_Pembelian/retur_pembelian_detail');
const Retur_Pembelian_Header = require('../../Model/Retur_Pembelian/retur_pembelian_header');
const Retur_Penjualan_Detail = require('../../Model/Retur_Penjualan/retur_penjualan_detail');
const Retur_Penjualan_Header = require('../../Model/Retur_Penjualan/retur_penjualan_header');

exports.delete = async (req,res) => {
    const transaction = await sequelize.transaction();

    try{

        // Penjualan
        const penjualan_header = await Penjualan_Header.findOne({
            attributes : ['id_penjualan'],
            where : {
                tanggal_penjualan : '0000-00-00'
            }
        });
        if(penjualan_header){
            await Penjualan_Detail.destroy({
                where : {
                    id_penjualan : penjualan_header.id_penjualan
                }
            });
            await Penjualan_Service.destroy({
                where : {
                    id_penjualan : penjualan_header.id_penjualan
                }
            });
            await Penjualan_Header.destroy({
                where : {
                    id_penjualan : penjualan_header.id_penjualan
                }
            })
        }

        // Pesanan Pembelian
        const pesanan_pembelian = await Pesanan_Pembelian_Header.findOne({
            attributes : ['id_pesanan_pembelian'],
            where : {
                status : 'Pembuatan'
            }
        });
        if(pesanan_pembelian){
            await Pesanan_Pembelian_Detail.destroy({
                where : {
                    id_pesanan_pembelian : pesanan_pembelian.id_pesanan_pembelian
                }
            });
            await Pesanan_Pembelian_Header.destroy({
                where : {
                    id_pesanan_pembelian : pesanan_pembelian.id_pesanan_pembelian
                }
            });
        }

        // Pembelian
        const pembelian = await Pembelian_Header.findOne({
            attributes : ['id_pembelian'],
            where : {
                status : 'Pembuatan'
            }
        })
        if(pembelian){
            await Pembelian_Detail.destroy({
                where : {
                    id_pembelian : pembelian.id_pembelian
                }
            });
            await Pembelian_Header.destroy({
                where : {
                    id_pembelian : pembelian.id_pembelian
                }
            });
        }

        // Penyesuaian
        const penyesuaian = await Penyesuaian_Header.findOne({
            attributes : ['id_penyesuaian'],
            where : {
                tanggal_penyesuaian : '0000-00-00'
            }
        })
        if(penyesuaian){
            await Penyesuaian_Detail.destroy({
                where : {
                    id_penyesuaian : penyesuaian.id_penyesuaian
                }
            });
            await Penyesuaian_Header.destroy({
                where : {
                    id_penyesuaian : penyesuaian.id_penyesuaian
                }
            });
        }

        // Retur Pembelian
        const retur_pembelian = await Retur_Pembelian_Header.findOne({
            attributes : ['id_retur_pembelian'],
            where : {
                tanggal_retur : '0000-00-00'
            }
        });
        if(retur_pembelian){
            await Retur_Pembelian_Detail.destroy({
                where : {
                    id_retur_pembelian : retur_pembelian.id_retur_pembelian
                }
            });
            await Retur_Pembelian_Header.destroy({
                where : {
                    id_retur_pembelian : retur_pembelian.id_retur_pembelian
                }
            });
        }

        // Retur Penjualan
        const retur_penjualan = await Retur_Penjualan_Header.findOne({
            attributes : ['id_retur_penjualan'],
            where : {
                tanggal_retur : '0000-00-00'
            }
        });
        if(retur_penjualan){
            await Retur_Penjualan_Detail.destroy({
                where : {
                    id_retur_penjualan : retur_penjualan.id_retur_penjualan
                }
            });
            await Retur_Penjualan_Header.destroy({
                where : {
                    id_retur_penjualan : retur_penjualan.id_retur_penjualan
                }
            });
        }


        await res.status(200).send();
    }catch(error){
        await transaction.rollback();
        await res.status(200).end();
        console.log(error)
    }
}