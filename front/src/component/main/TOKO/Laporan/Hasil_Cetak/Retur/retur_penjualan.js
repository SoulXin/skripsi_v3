import React from 'react'
import { formatMoney } from '../../../../../global/function'
import moment from 'moment'

export class Cetak_Retur_Penjualan extends React.PureComponent {
    render() {
        this.state = {
            total : 0
        }

        this.props.dataTable.map((list,index) => {
            this.state.total += list.grand_total
        })
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{border : '2px solid black'}}>
                <div className="col-6">
                    <h1 style={{textAlign:'center'}}>Laporan Retur Penjualan</h1>
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
                        {/* <tr>
                            <td>Nama Pelanggan / Nomor Polisi</td>
                            <td>{this.props.pelanggan ? this.props.pelanggan : ''}</td>
                        </tr> */}
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
                    <th className="p-3">ID Retur Penjualan</th>
                    <th className="p-3">ID Penjualan</th>
                    <th className="p-3">Tanggal Retur</th>
                    <th className="p-3">Alasan</th>
                    <th className="p-3">Total</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr>
                                    <td className="p-3">{list.id_retur_penjualan}</td>
                                    <td className="p-3">{list.Retur_Penjualan_Detail[0].id_penjualan}</td>
                                    <td className="p-3">{list.tanggal_retur}</td>
                                    <td className="p-3">{list.alasan_retur ? list.alasan_retur : 'Tidak Ada'}</td>
                                    <td className="p-3">Rp. {formatMoney(list.grand_total)}</td>
                                </tr>
                            )
                        })
                    }
                    <tr style={{borderTop : '2px solid black',background : 'white'}}>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td style = {{borderBottom : '2px solid black'}}>Grand Total : </td>
                        <td style = {{borderBottom : '2px solid black'}}>Rp. {formatMoney(this.state.total)}</td>
                    </tr>
                </table>
            </div>
        </div>
      );
    }
  }