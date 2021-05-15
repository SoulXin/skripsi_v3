import React from 'react'
import { formatMoney } from '../../../../../global/function'
import moment from 'moment'

export class Cetak_Service extends React.PureComponent {
    render() {
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{border : '2px solid black'}}>
                <div className="col-6">
                    <h1 style={{textAlign:'center'}}>Laporan Service</h1>
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
                    <th>ID Penjualan</th>
                    <th>Tanggal</th>
                    <th>Nama Mekanik</th>
                    <th>Service</th>
                    <th>Harga</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            if(list.Mekanik_Header){
                                return (
                                    <tr key={index}>
                                        <td>{list.id_penjualan}</td>
                                        <td>{list.tanggal_penjualan}</td>
                                        <td>{list.Mekanik_Header.nama}</td>
                                        <td>{list.Penjualan_Service.Jenis_Service.nama}</td>
                                        <td>Rp. {formatMoney(list.Penjualan_Service.Jenis_Service.harga)}</td>
                                    </tr>
                                )
                            }
                        })
                    }

                </table>
            </div>
        </div>
      );
    }
  }