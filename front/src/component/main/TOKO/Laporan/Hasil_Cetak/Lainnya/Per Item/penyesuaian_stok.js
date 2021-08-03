import React from 'react'
import { formatMoney } from '../../../../../../global/function'
import moment from 'moment'

export class Cetak_Penyesuaian_Stok_Per_Item extends React.PureComponent {
    render() {  
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{border : '2px solid black'}}>
                <div className="col-6">
                    <h1 style={{textAlign:'center'}}>Laporan Penyesuaian Barang </h1>
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
                    <th className="p-3">ID Penyesuaian</th>
                    <th className="p-3">ID Barang</th>
                    <th className="p-3">Tanggal Penyesuaian</th>
                    <th className="p-3">Nama Barang</th>
                    <th className="p-3">Jumlah Fisik</th>
                    <th className="p-3">Jumlah Sistem</th>
                    <th className="p-3">Penyesuaian</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr key = {index}>
                                    <td>{list.id_penyesuaian}</td>
                                    <td>{list.id_barang}</td>
                                    <td>{list.tanggal_penyesuaian}</td>
                                    <td>{list.nama_barang}</td>
                                    <td>{list.jumlah_fisik}</td>
                                    <td>{list.jumlah_sistem}</td>
                                    <td>{list.penyesuaian}</td>
                                </tr>
                            )
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