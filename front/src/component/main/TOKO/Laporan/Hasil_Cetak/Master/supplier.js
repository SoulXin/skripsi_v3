import React from 'react'
import moment from 'moment'

export class Cetak_Supplier extends React.PureComponent {
    render() {
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{border : '2px solid black'}}>
                <div className="col-6" style = {{borderRight : '2px solid black'}}>
                    <h1 style={{textAlign:'center'}}>Laporan Supplier</h1>
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
                    <th>ID Supplier</th>
                    <th>Nama</th>
                    <th>Nomor Telepon</th>
                    <th>Email</th>
                    <th>Alamat</th>
                    <th>Bank</th>
                    <th>No.Rekening</th>
                    <th>Keterangan</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.id_supplier}</td>
                                    <td>{list.nama_supplier}</td>
                                    <td>{list.nomor_telepon_supplier}</td>
                                    <td>{list.email_supplier}</td>
                                    <td>{list.alamat_supplier}</td>
                                    <td>{list.bank_supplier}</td>
                                    <td>{list.no_rek_supplier}</td>
                                    <td>{list.keterangan}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <div className="row mt-5 pt-5">
                <p className="offset-1 col-2 text-center border-top">Pencetak</p>
                <p className="offset-6 col-2 text-center  border-top">Penerima</p>
            </div>
        </div>
      );
    }
  }