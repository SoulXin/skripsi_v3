import React from 'react'
import { formatMoney } from '../../../../../global/function'
import moment from 'moment'

export class Cetak_Penjualan extends React.PureComponent {
    render() {
        this.state = {
            totalOnline : 0,
            totalOffline : 0
        }
        this.props.dataTableOnline.map((list,index) => {
            this.state.totalOnline += list.grand_total;
        });

        this.props.dataTableOffline.map((list,index) => {
            this.state.totalOnline += list.grand_total;
        });
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{border : '2px solid black'}}>
                <div className="col-6">
                    <h1 style={{textAlign:'center'}}>Laporan Penjualan</h1>
                </div>
                <div className="col-6">
                    <table>
                        <tr>
                            <td>Dari Tanggal</td>
                            <td>{this.props.dari ? this.props.dari : '-'}</td>
                        </tr>
                        <tr>
                            <td>Sampai Tanggal</td>
                            <td>{this.props.sampai ? this.props.sampai : '-'}</td>
                        </tr>
                        <tr>
                            <td>Tanggal Cetak</td>
                            <td>  {moment(this.props.tanggal).utc().format('DD / MMMM / YYYY')} </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="row mx-auto" style={{border : '2px solid black'}}>
                <table className="">
                <thead>
                    <th>ID Penjualan</th>
                    <th>Tanggal Penjualan</th>
                    <th>Nama Pelanggan</th>
                    <th>Jenis Penjualan</th>
                    <th>Status</th>
                    <th>Total</th>
                </thead>
                    {
                        this.props.dataTableOnline.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.tanggal_pemesanan}</td>
                                    <td>{list.Pelanggan.nama_pelanggan}</td>
                                    <td>Online</td>
                                    <td>{list.status}</td>
                                    <td>Rp. {formatMoney(list.grand_total)}</td>
                                </tr>
                            )
                        })
                    }

                    {
                        this.props.dataTableOffline.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.id_penjualan}</td>
                                    <td>{list.tanggal_penjualan}</td>
                                    <td>{list.nopol}</td>
                                    <td>Datang Ke Toko</td>
                                    <td>{list.status}</td>
                                    <td>Rp. {formatMoney(list.grand_total)}</td>
                                </tr>
                            )
                        })
                    }

                    <tr style={{borderTop : '2px solid black',background : 'white'}}>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td >&nbsp;</td>
                        <td style = {{borderBottom : '2px solid black'}}>Grand Total : </td>
                        <td style = {{borderBottom : '2px solid black'}}>Rp. {formatMoney(this.state.totalOnline + this.state.totalOffline)}</td>
                    </tr>
                </table>
            </div>
        </div>
      );
    }
  }