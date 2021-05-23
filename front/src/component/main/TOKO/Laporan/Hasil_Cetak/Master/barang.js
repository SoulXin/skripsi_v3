import React from 'react'
import moment from 'moment'

export class Cetak_Barang extends React.PureComponent {
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
            <div className="row mx-auto" style={{border : '2px solid black'}}>
                <table className="">
                <thead>
                    <th>ID Barang</th>
                    <th>Nama</th>
                    <th>Merek</th>
                    <th>Jenis Kereta</th>
                    <th>Kategori</th>
                    <th>Stok</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.id_barang}</td>
                                    <td>{list.nama_barang}</td>
                                    <td>{list.merek_barang}</td>
                                    <td>{list.jenis_kereta}</td>
                                    <td>{list.Barang_Detail.Kategori.nama_kategori}</td>
                                    <td>{list.Barang_Detail.stok}</td>
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