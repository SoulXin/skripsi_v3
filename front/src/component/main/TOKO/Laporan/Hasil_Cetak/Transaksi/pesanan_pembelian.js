import React from 'react'
import { formatMoney } from '../../../../../global/function'

export class Cetak_Pesanan_Pembelian extends React.PureComponent {
    render() {
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{borderBottom : '2px solid black'}}>
                <div className="col-12">
                    <h1 style={{textAlign:'center'}}>Data Pesanan Pembelian</h1>
                </div>
            </div>
            <div className="row mx-auto" style={{borderBottom : '2px solid black'}}>
                <table className="">
                <thead>
                    <th>ID Pesanan Pembelian</th>
                    <th>Tanggal Pemesanan</th>
                    <th>Nama Supplier</th>
                    <th>Total</th>
                    <th>Status</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.id_pesanan_pembelian}</td>
                                    <td>{list.tanggal_pemesanan}</td>
                                    <td>{list.Supplier.nama_supplier}</td>
                                    <td>{list.grand_total}</td>
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