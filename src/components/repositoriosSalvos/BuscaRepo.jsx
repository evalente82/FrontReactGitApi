/* eslint-disable no-unused-vars */

import React, {useState, useEffect}from 'react'
import {getRepositorysTodos} from '../../services/RepositorysService'
import RepositorysRow from './RepositorysRow'
import {deleteRepositorysService} from '../../services/RepositorysService'

function Repo(){

    const [repositories, setRepositories] = useState([])
    const [fetchData, setFetchData] = useState(true);
    const [vetor, setVetor] = useState([])

    const triggerDataFetch = () => setFetchData(t => !t);

    useEffect(() =>{
        
        getRepositorysTodos()
        .then((result) =>{
            setVetor(result)
        })
    },[fetchData])


    function onDeleteClick(event) {
        
        triggerDataFetch();
        const id = event.target.id.replace('delete', '')
        deleteRepositorysService(id)
        let copiaVetor = [...vetor]
        copiaVetor.splice(id,1)
        setVetor(copiaVetor) 
    }
    

    function RepoRow(props) {  
   
        return(
            <tr>
                <td >{props.data.id}</td>
                <td >{props.data.name}</td>
                <td>{props.data.description}</td>
                <td>{props.data.language}</td>
                <td><a href={props.data.html_url} target="_blank" rel="noopener noreferrer">Saiba mais</a></td>
                <td><button type = "button" class="btn btn-danger" id = {"delete" + props.data.id} onClick={props.onClick}>Deletar</button>
                </td>
            </tr>
        )
    }
    

    return(
        <React.Fragment>
                <div className='row'>
                    <div className='col-12'>
                        <div className='col-12 mb-4'>
                            <div className='card border-0 shadow'>
                                <div className='card-header'>
                                    <div className='row align-items-lg-center'>
                                        <div className='col'>
                                            <h2 className='fs-5 fw-bold mb-0'>
                                                Repositórios
                                            </h2>
                                        </div>
                                    </div>

                                </div>
                                <div className='table-responsive'>
                                    <div className='table align-items-center'>
                                        <thead>
                                            <tr>
                                                <th className='border-bottom' scope='col'>#</th>
                                                <th className='border-bottom' scope='col'>Nome do Repositório</th>
                                                <th className='border-bottom' scope='col'>Descrição</th>
                                                <th className='border-bottom' scope='col'>Linguagem</th>
                                                <th className='border-bottom' scope='col'>Link</th>
                                                <th className='border-bottom' scope='col'>Ação</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                    </tr>
                                            {vetor.map(item => <RepoRow key={item.id} data={item} onClick={onDeleteClick} />)}
                                            
                                        </tbody>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            
        </React.Fragment>
    )
}

export default Repo