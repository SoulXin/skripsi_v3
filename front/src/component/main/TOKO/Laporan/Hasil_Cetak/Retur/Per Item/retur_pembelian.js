import React from 'react'
import { formatMoney } from '../../../../../../global/function'
import moment from 'moment'

export class Cetak_Retur_Pembelian_Per_Item extends React.PureComponent {
    render() {
        this.state = {
            total : 0
        }

        this.props.dataTable.map((list,index) => {
            this.state.total += list.total
        })
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{border : '2px solid black'}}>
                <div className="col-6">
                    <h1 style={{textAlign:'center'}}>Laporan Retur Pembelian Barang</h1>
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
                        {
                            this.props.supplier ? 
                            <tr>
                                <td>Supplier</td>
                                <td>{this.props.supplier}</td>
                            </tr> : null
                        }
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
                    <th>ID Retur Pembelian</th>
                    <th>ID Pembelian</th>
                    <th>ID Supplier</th>
                    <th>ID Barang</th>
                    <th>Tanggal Retur</th>
                    <th>Nama Barang</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.id_retur_pembelian}</td>
                                    <td>{list.id_pembelian}</td>
                                    <td>{list.id_supplier}</td>
                                    <td>{list.id_barang}</td>
                                    <td>{list.tanggal_retur}</td>
                                    <td>{list.nama_barang}</td>
                                    <td>Rp. {formatMoney(list.harga)}</td>
                                    <td>{list.jumlah}</td>
                                    <td>Rp. {formatMoney(list.total)}</td>
                                </tr>
                            )
                        })
                    }
                    <tr style={{borderTop : '2px solid black',background : 'white'}}>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td >&nbsp;</td>
                        <td >&nbsp;</td>
                        <td >&nbsp;</td>
                        <td colSpan="2" style = {{borderBottom : '2px solid black'}}>Grand Total : </td>
                        <td colSpan="2" style = {{borderBottom : '2px solid black'}}>Rp. {formatMoney(this.state.total)}</td>
                    </tr>
                </table>
            </div>
        </div>
      );
    }
  }