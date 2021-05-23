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
                    <th className="p-3">ID Penjualan</th>
                    <th className="p-3">ID Service</th>
                    <th className="p-3">ID Mekanik</th>
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Nama Mekanik</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Harga</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr key={index}>
                                    <td className="p-3">{list.id_penjualan}</td>
                                    <td className="p-3">{list.id_service}</td>
                                    <td className="p-3">{list.id_mekanik}</td>
                                    <td className="p-3">{list.tanggal_penjualan}</td>
                                    <td className="p-3">{list.nama_mekanik}</td>
                                    <td className="p-3">{list.service}</td>
                                    <td className="p-3">Rp. {formatMoney(list.harga)}</td>
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