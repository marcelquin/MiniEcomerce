import { useEffect, useState } from 'react';
import './Debitos.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Navadm from '../../../Componentes/NavAdm/NavAdm';


function Pagamento() {
    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const {id} = useParams()
    const navigate = useNavigate();
    const[postData, setpostData] = useState({
      'formapagamento': '',
      'parcelas': 1
    })
    const [ teste, setteste] = useState([])
    const [boletoData, setboletoData] = useState({
      'empresa': '',
      'cnpj': '',
      'statusPagamento': '',
      'dataVencimento': '',
      'parcelas': '',
      'parcelaAtual': '',
      'valorTotal': '',
      'valorParcela': '',
      'dataPagamento': '',
      'formapagamento': '',
      'parcelaPagamento': ''
    })
    const handleChanage = (e) => {
      setpostData(prev=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleClickPagamento=async (e)=>{
        try{
          fetch(`${baseUrl}/debito/NovoPagamento`, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'idBoleto': id,
                'formapagamento': postData.formapagamento,
                'parcelas': postData.parcelas
        })})
        .then(navigate("/adm"))  
        setpostData({
            'formapagamento': '',
            'parcelas': 1
        })
        }catch (err){
          console.log("erro")
        }
      }

      useEffect(()=>{
        fetch(`${baseUrl}/debito/BuscarBoletoPorId?idBoleto=${id}`, 
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setboletoData(data)
            })
            .catch(err => console.log(err))
    }, [id])

    return(
    <>
      <div className='admDebitoGeral'>
        <div className='admDebitoNav'>
          <Navadm></Navadm>
        </div>
        <div className='admDebitoConteudo'>
          <div className='admDebitoConteudoTabela'>
            <form onSubmit={handleClickPagamento}> 
              <fieldset>Preencha os campos
                <table>
                  <tr>
                    <td>Forma de pagamento: <br/>
                    <input list="formaPagamento" name="formapagamento"  placeholder="Selecione a Forma de pagameto" onChange={handleChanage} />
                                          <datalist id="formaPagamento">
                                              <option value="DINHEIRO">DINHEIRO</option>
                                              <option value="PIX">PIX</option>
                                              <option value="CREDITO">CREDITO</option>
                                              <option value="DEBITO">DEBITO</option>
                                          </datalist>                                          
                    </td>
                    {postData.formapagamento.length == 7?(<>
                    <td>Parcelas: <br/>
                    <td><label>Parcelas: <br/>
                    <input type="number" name="parcelas" onChange={handleChanage}/></label></td>   
                    </td>
                    </>):(<></>)}
                  </tr>
                  <tr>
                    <td><input type='submit' value="Pagar"/></td>
                  </tr>
                </table>
              </fieldset>
            </form>
          </div>
          <div className='admDebitoConteudoMaisInfo'>
            <p>Empresa: {boletoData.empresa}</p>
            <p>CNPJ: {boletoData.cnpj}</p>
            <p>Data Vencimento: {boletoData.dataVencimento}</p>
            <p>Status Pagamento: {boletoData.statusPagamento}</p>
            <p>Valor Total: {boletoData.valorTotal}</p>
            <p>Valor Parcela: {boletoData.valorParcela}</p>
            <p>Parcela Atual: {boletoData.parcelaAtual}</p>           
          </div>
        </div>
      </div>


    </>
    );
}

export default Pagamento;