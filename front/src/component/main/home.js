import React,{useEffect,useState} from 'react';

const Index = () => {
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState('');
    
    useEffect(() => {
        const loadData = async () => {

        }
        loadData();

        return () => {
        }
    }, [refresh]);


    return (
        <div className = "col-lg-10 container-fluid" style = {{zIndex : 0}}>
            <h1>Selamat Datang</h1>
        </div>
    )
}

export default Index