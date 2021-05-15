import React from 'react'
import { formatMoney } from '../../../../../global/function'
import moment from 'moment'

export class Cetak_Hutang extends React.PureComponent {
    render() {
        console.log(this.props.status_lunas)
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{border: '2px solid black'}}>
                <div className="col-6">
                    {
                        this.props.status_lunas ? 
                        <h1 style={{textAlign:'center'}}>Laporan Pembayaran Hutang</h1> :
                        <h1 style={{textAlign:'center'}}>Laporan Hutang Jatuh Tempo</h1>
                    }
                </div>
                <div className="col-6">
                    <table>
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
                    <th>ID Pembelian</th>
                    <th>{this.props.status_lunas ? 'Tanggal Pembayaran' : 'Tanggal Jatuh Tempo'}</th>
                    <th>Nama Supplier</th>
                    <th>Total</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr key={index}>
                                    <td >{list.id_pembelian}</td>
                                    <td>{list.tanggal_jatuh_tempo}</td>
                                    <td>{list.Supplier.nama_supplier}</td>
                                    <td>Rp. {formatMoney(list.grand_total)}</td>
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