import React from 'react'
import moment from 'moment'

export class Cetak_Mekanik extends React.PureComponent {
    render() {
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{border : '2px solid black'}}>
                <div className="col-6">
                    <h1 style={{textAlign:'center'}}>Laporan Persediaan Barang</h1>
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

            <div className="row mx-auto" style={{border: '2px solid black'}}>
                <table className="">
                <thead>
                    <th>ID Mekanik</th>
                    <th>Nama</th>
                    <th>No Telepon</th>
                    <th>Alamat</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.id_mekanik}</td>
                                    <td>{list.nama}</td>
                                    <td>{list.no_telp}</td>
                                    <td>{list.alamat}</td>
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