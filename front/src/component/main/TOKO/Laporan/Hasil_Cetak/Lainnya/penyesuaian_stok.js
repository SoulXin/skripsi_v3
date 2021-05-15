import React from 'react'
import moment from 'moment'

export class Cetak_Penyesuaian_Stok extends React.PureComponent {
    render() {
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{border : '2px solid black'}}>
                <div className="col-6">
                    <h1 style={{textAlign:'center'}}>Laporan Penyesuaian Stok</h1>
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
                    <th>ID Penyesuaian</th>
                    <th>Tanggal Penyesuaian</th>
                    <th>Jumlah Fisik</th>
                    <th>Jumlah Sistem</th>
                    <th>Penyesuaian</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr key={index}>
                                    <td>{list.id_penyesuaian}</td>
                                    <td>{list.tanggal_penyesuaian}</td>
                                    <td>{list.Penyesuaian_Detail.jumlah_fisik}</td>
                                    <td>{list.Penyesuaian_Detail.jumlah_sistem}</td>
                                    <td>{list.Penyesuaian_Detail.penyesuaian}</td>
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