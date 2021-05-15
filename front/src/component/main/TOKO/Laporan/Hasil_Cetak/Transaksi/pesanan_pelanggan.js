import React from 'react'
import { formatMoney } from '../../../../../global/function'

export class Cetak_Pesanan_Pelanggan extends React.PureComponent {
    render() {
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{borderBottom : '2px solid black'}}>
                <div className="col-12">
                    <h1 style={{textAlign:'center'}}>Data Pesanan Pelanggan</h1>
                </div>
            </div>
            <div className="row mx-auto" style={{borderBottom : '2px solid black'}}>
                <table className="">
                <thead>
                    <th>ID Pesanan Pelanggan</th>
                    <th>Tanggal Pemesanan</th>
                    <th>Nama Pelanggan</th>
                    <th>Jenis Pesanan</th>
                    <th>Bukti Pembayaran</th>
                    <th>Total</th>
                    <th>Status</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            var ongkosKirim = list.Pesanan_Pelanggan_Pengantaran.Daerah_Pengantaran.harga;
                            var biayaService =  0;
                            list.Pesanan_Pelanggan_Booking_Service.map((list,index) => {
                                biayaService += list.Jenis_Service.harga;
                            });
                            return (
                                <tr>
                                    <td>{list.id_pesanan_pelanggan}</td>
                                    <td>{list.tanggal_pemesanan}</td>
                                    <td>{list.Pelanggan.nama_pelanggan}</td>
                                    <td>{list.status_pesanan ? 'Kunjungan' : 'Pengantaran'}</td>
                                    <td>{list.bukti_pembayaran_pelanggan ? 'Tersedia' : ' - '}</td>
                                    <td>Rp. {list.status_pesanan ? formatMoney(list.grand_total + biayaService) : formatMoney(list.grand_total + ongkosKirim)}</td>
                                    <td>{list.status}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
      );
    }
  }