import React from 'react'

export class Cetak_Kategori extends React.PureComponent {
    render() {
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{borderBottom : '2px solid black'}}>
                <div className="col-12">
                    <h1 style={{textAlign:'center'}}>Data Kategori</h1>
                </div>
            </div>
            <div className="row mx-auto" style={{borderBottom : '2px solid black'}}>
                <table className="">
                <thead>
                    <th>ID Kategori</th>
                    <th>Nama</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.id_kategori}</td>
                                    <td>{list.nama_kategori}</td>
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