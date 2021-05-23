import React from 'react'
import { formatMoney } from '../../../../../global/function'
import moment from 'moment'

export class Cetak_Penjualan extends React.PureComponent {
    render() {
        this.state = {
            totalOffline : 0
        }

        this.props.dataTableOffline.map((list,index) => {
            this.state.totalOffline += list.grand_total;
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
                            <td>Dari Tanggalxxx</td>
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
                    <th className="p-3">ID Penjualan</th>
                    <th className="p-3">Tanggal Penjualan</th>
                    <th className="p-3">Nama Pelanggan</th>
                    <th className="p-3">Nomor Polisi</th>
                    <th className="p-3">Total</th>
                </thead>
                    {
                        this.props.dataTableOffline.map((list,index) => {
                            return (
                                <tr key = {index}>
                                    <td>{list.id_penjualan}</td>
                                    <td>{list.tanggal_penjualan}</td>
                                    <td>{list.Penjualan_Pelanggan.nama_pelanggan}</td>
                                    <td>{list.Penjualan_Pelanggan.nomor_polisi}</td>
                                    <td>Rp. {formatMoney(list.grand_total)}</td>
                                </tr>
                            )
                        })
                    }

                    <tr style={{borderTop : '2px solid black',background : 'white'}}>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td >&nbsp;</td>
                        <td style = {{borderBottom : '2px solid black'}}>Grand Total : </td>
                        <td style = {{borderBottom : '2px solid black'}}>Rp. {formatMoney(this.state.totalOffline)}</td>
                    </tr>
                </table>
            </div>
        </div>
      );
    }
  }