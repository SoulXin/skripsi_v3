import React from 'react'
import { formatMoney } from '../../../../../global/function'
import moment from 'moment'

export class Cetak_Hutang extends React.PureComponent {
    render() {
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
                    {
                        this.props.status_lunas ? 
                        <th className="p-3">ID Pembayaran</th> : null
                    }
                    <th className="p-3">ID Pembelian</th>
                    <th className="p-3">ID Supplier</th>
                    <th className="p-3">{this.props.status_lunas ? 'Tanggal Pembayaran' : 'Tanggal Jatuh Tempo'}</th>
                    <th className="p-3">Nama Supplier</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            if(list.Pembayaran_Hutang_Detail){
                                return (
                                    <tr key={index}>
                                        <td className="p-3" >{list.Pembayaran_Hutang_Detail.id_pembayaran}</td>
                                        <td className="p-3" >{list.id_pembelian}</td>
                                        <td className="p-3" >{list.id_supplier}</td>
                                        <td className="p-3" >{list.Pembayaran_Hutang_Detail.Pembayaran_Hutang_Header.tanggal_pembayaran}</td>
                                        <td className="p-3" >{list.Supplier.nama_supplier}</td>
                                        <td className="p-3" >Rp. {formatMoney(list.grand_total)}</td>
                                        <td className="p-3">{list.status === 'Proses' ? 'Belum Lunas' : 'Lunas'}</td>
                                    </tr>
                                )
                            }else{
                                return (
                                    <tr key={index}>
                                        <td className="p-3" >{list.id_pembelian}</td>
                                        <td className="p-3" >{list.id_supplier}</td>
                                        <td className="p-3" >{list.tanggal_jatuh_tempo}</td>
                                        <td className="p-3" >{list.Supplier.nama_supplier}</td>
                                        <td className="p-3" >Rp. {formatMoney(list.grand_total)}</td>
                                        <td className="p-3">{list.status === 'Proses' ? 'Belum Lunas' : 'Lunas'}</td>
                                    </tr>
                                )
                            }
                        })
                    }

                </table>
            </div>
            <div className="row mt-5 pt-5">
                <p className="offset-1 col-2 text-center border-top">Di Cetak Oleh</p>
                <p className="offset-6 col-2 text-center  border-top">Di Setujui Oleh</p>
            </div>
        </div>
      );
    }
  }