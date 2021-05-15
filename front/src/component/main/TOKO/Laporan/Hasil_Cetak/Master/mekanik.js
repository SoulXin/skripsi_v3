import React from 'react'

export class Cetak_Mekanik extends React.PureComponent {
    render() {
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{borderBottom : '2px solid black'}}>
                <div className="col-12">
                    <h1 style={{textAlign:'center'}}>Data Mekanik</h1>
                </div>
            </div>
            <div className="row mx-auto" style={{borderBottom : '2px solid black'}}>
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