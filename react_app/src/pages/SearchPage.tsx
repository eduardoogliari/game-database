import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GAME_API_BASE_URL from '../defs.js';
import SearchResultList from "../components/SearchResultList.js";
import MultiCheckbox from "../components/MultiCheckbox.js";
import Fieldset, { FieldsetData } from "../components/Fieldset.js";
// import { EmpresaDados } from "./Empresa.js";
// import { PlataformaDados } from "./Plataforma.js";
// import { GeneroDados } from "./Jogo.js";
import { MultiCheckboxData } from "../components/MultiCheckbox.js";

function SearchPage() {
    const [searchParams, setSearchParams]     = useSearchParams();
    const [responseData, setResponseData]     = useState([]);
    const [requestPending, setRequestPending] = useState(true);
    const [errorMessage, setErrorMessage]     = useState('');
    const [loadingMessage, setLoadingMessage] = useState('');
    const [requestStatus, setRequestStatus]   = useState('');
    const [totalItemCount, setTotalItemCount] = useState(0);
    const [totalPages, setTotalPages]         = useState(0);
    // const [pageSize, setPageSize]             = useState(0);
    const [pageIndex, setPageIndex]           = useState(0);

    const queryParam                          = searchParams.get('q');
    const sortByParam                         = searchParams.get('sortBy');
    const sortOrderParam                      = searchParams.get('sortOrder');
    const paginaIndexParam                    = searchParams.get('paginaIndex');

    const [plataformasArray, setPlataformasArray] = useState<MultiCheckboxData[]>([]);
    const [plataformasEscolhidas, setPlataformasEscolhidas] = useState<number[]>([]);

    const [empresasArray, setEmpresasArray] = useState<FieldsetData[]>([]);

    const [desenvolvedoraEscolhida, setDesenvolvedoraEscolhida] = useState<string>('');
    const [publicadoraEscolhida, setPublicadoraEscolhida]       = useState<string>('');

    const [generosArray, setGenerosArray] = useState<MultiCheckboxData[]>([]);
    const [generosEscolhidos, setGenerosEscolhidos] = useState<number[]>([]);

    const [hideFilterOptions, setHideFilterOptions] = useState(true);

    const areSearchParamsEmpty = searchParams.get('genero') === null &&
        searchParams.get('desenvolvedora') === null &&
        searchParams.get('publicadora') === null &&
        searchParams.get('plataforma') === null;


    useEffect(() => {
        setLoadingMessage('');
        setTimeout(() => { setLoadingMessage("Aguarde...") }, 2000);

        setRequestPending(true);
        setErrorMessage('');
        setRequestStatus("pending");

        let queryString = GAME_API_BASE_URL + '/jogos/';

        if ( searchParams.size > 0 ) {
            queryString += '?';

            queryString += queryParam ? `nome=${queryParam}` : '';

            switch (sortByParam) {
                case "nome":
                    queryString += '&sortBy=nome';
                    break;
                case "data":
                    queryString += '&sortBy=data_lancamento';
                    break;
                default:
                    break;
            }

            switch (sortOrderParam) {
                case "asc":
                    queryString += '&sortOrder=asc';
                    break;
                case "desc":
                    queryString += '&sortOrder=desc';
                    break;
                default:
                    break;
            }

            const desenvolvedoraParam = searchParams.get('desenvolvedora');
            const desenvolvedoraId = empresasArray.find((e) => e.nome === desenvolvedoraParam)?.id;
            queryString += (desenvolvedoraId) ? `&desenvolvedora=${desenvolvedoraId}` : '';

            const publicadoraParam = searchParams.get('publicadora');
            const publicadoraId = empresasArray.find((e) => e.nome === publicadoraParam)?.id;
            queryString += (publicadoraId) ? `&publicadora=${publicadoraId}` : '';

            const generoParam = searchParams.get('genero');
            queryString += (generoParam && generoParam.length > 0) ? `&genero=${generoParam}` : '';

            const plataformaParam = searchParams.get('plataforma');
            queryString += (plataformaParam) ? `&plataforma=${plataformaParam}` : '';

            queryString += (paginaIndexParam) ? `&pagina=${paginaIndexParam}` : '';
        }


        fetch(queryString)
            .then((res) => {
                const totalItemCount = res.headers.get('Total-Item-Count') ?? '0';
                const pageCount      = res.headers.get('Total-Pages') ?? '1';
                // const pageSize       = res.headers.get('Page-Size') ?? '0';
                const pageIndex      = res.headers.get('Page-Index') ?? '1';

                setTotalItemCount( parseInt(totalItemCount) || 0);
                setTotalPages(parseInt(pageCount) || 1);
                // setPageSize(parseInt(pageSize) || 0);
                setPageIndex(parseInt(pageIndex) || 1);
                return res.json();
            })
            .then((data) => {
                setResponseData(data);
                setRequestStatus("success");
            })
            .catch((err) => {
                console.error(err);
                setRequestStatus( "error");
                setErrorMessage(`Algo deu errado. Recarregue a página para tentar novamente.`);

            }).finally( () =>
                setRequestPending(false)
            );
    }, [queryParam, sortByParam, sortOrderParam, searchParams, paginaIndexParam, empresasArray]);


    useEffect(() => {
        fetch( GAME_API_BASE_URL + '/plataformas' )
            .then( (res) => res.json() )
            .then((data) => {
                const arr = data.map( (item : {id : number, nome_popular : string}) => { return {"id" : item.id, "nome": item.nome_popular} } );
                setPlataformasArray(arr);
            })
            .catch( (err) => console.error(err) )
    }, []);

    useEffect(() => {
        fetch(GAME_API_BASE_URL + '/empresas')
            .then((res) => res.json())
            .then((data) => {
                const arr = data.map((item: { id: number, nome: string }) => { return { "id": item.id, "nome": item.nome } });
                setEmpresasArray(arr);
            })
            .catch((err) => console.error(err))
    }, []);

    useEffect(() => {
        fetch(GAME_API_BASE_URL + '/generos')
            .then((res) => res.json())
            .then((data) => {
                const arr = data.map((item: { id: number, nome: string }) => { return { "id": item.id, "nome": item.nome } });
                setGenerosArray(arr);
            })
            .catch((err) => console.error(err))
    }, []);

    function onSortByChanged(event : React.ChangeEvent) {
        searchParams.set('sortBy', (event.target as HTMLInputElement).value);
        setSearchParams(searchParams);
    }

    function onSortOrderChanged(event: React.ChangeEvent) {
        searchParams.set('sortOrder', (event.target as HTMLInputElement).value);
        setSearchParams(searchParams);
    }

    function onPlataformaChanged(event : React.MouseEvent) {
        const plataformaId = parseInt( (event.target as HTMLInputElement).value );
        const selected = plataformasEscolhidas.includes(plataformaId);
        let arr = [...plataformasEscolhidas];

        if (selected) {
            arr = arr.filter((c) => c !== plataformaId);
        } else {
            arr.push(plataformaId);
        }
        setPlataformasEscolhidas(arr);
    }

    function onDesenvolvedoraChanged(event : React.ChangeEvent) {
        setDesenvolvedoraEscolhida((event.target as HTMLInputElement).value );
    }

    function onPublicadoraChanged(event : React.ChangeEvent ) {
        setPublicadoraEscolhida((event.target as HTMLInputElement).value);
    }

    function onGenerosChanged(event: React.MouseEvent) {
        const id = parseInt((event.target as HTMLInputElement).value);
        const selected = generosEscolhidos.includes(id);
        let arr = [...generosEscolhidos];

        if (selected) {
            arr = arr.filter((c) => c !== id);
        } else {
            arr.push(id);
        }
        setGenerosEscolhidos(arr);
    }

    function onAdvancedFilterButtonClicked() {
        setHideFilterOptions(!hideFilterOptions );
    }

    function onSearchFilterFormSubmit(event : React.FormEvent) {
        event.preventDefault();

        if( generosEscolhidos.length > 0 ) {
            searchParams.set('genero', generosEscolhidos.toString());
        }

        if (plataformasEscolhidas.length > 0) {
            searchParams.set( 'plataforma', plataformasEscolhidas.toString() );
        }

        if (desenvolvedoraEscolhida.length > 0 ) {
            searchParams.set('desenvolvedora', desenvolvedoraEscolhida );
        }

        if (publicadoraEscolhida.length > 0) {
            searchParams.set('publicadora', publicadoraEscolhida );
        }

        setHideFilterOptions(true);
        setSearchParams(searchParams);
    }

    function onLimparFiltroClicked() {
        searchParams.delete('genero');
        searchParams.delete('desenvolvedora');
        searchParams.delete('publicadora');
        searchParams.delete('plataforma');

        setGenerosEscolhidos([]);
        setPlataformasEscolhidas([]);
        setDesenvolvedoraEscolhida('');
        setPublicadoraEscolhida('');
        setHideFilterOptions(true);

        setSearchParams(searchParams);
    }

    function onNomeEmpresaBlur( event : React.FocusEvent<HTMLInputElement> ) {
        const empresaNome = event.target?.value;
        if( !empresasArray.some( (e) => e.nome === empresaNome ) ) {
            event.target.value = '';
        }
    }

    function onPaginationPrevButtonClick() {
        const page = Math.max( 1, pageIndex-1 );
        searchParams.set('paginaIndex', page.toString() )
        setSearchParams(searchParams);
    }

    function onPaginationNextButtonClick() {
        const page = Math.min( totalPages, pageIndex + 1);
        searchParams.set('paginaIndex', page.toString())
        setSearchParams(searchParams);
    }

    return (
        <main className="search-page-main">
            {
            (requestPending)
                ? <p>{loadingMessage}</p>
                : (requestStatus === "error")
                    ? <p>{errorMessage ?? "Erro desconhecido"}</p>
                    : <div>
                            <div className="search-filter-div">
                                <div className="search-filter-display-buttons">
                                    <button className="botao-exibir-filtro" onClick={onAdvancedFilterButtonClicked}>[ {(hideFilterOptions) ? '+' : '-'} ] Opções avançadas de busca</button>
                                    {/* {(!areSearchParamsEmpty()) */}
                                    {(!areSearchParamsEmpty)
                                        ? <button className='botao-limpar-filtro' onClick={onLimparFiltroClicked}>[x] Limpar filtros</button>
                                        : <></>
                                    }
                                </div>
                                <div className="search-filter-container" hidden={hideFilterOptions}>
                                    <form className="search-filter-form" onSubmit={onSearchFilterFormSubmit}>
                                        {/*<EmpresaFieldset legend={"Desenvolvedora:"} empresasArray={empresasArray} value={desenvolvedoraEscolhida} onChange={onDesenvolvedoraChanged} onBlur={onNomeEmpresaBlur} ></EmpresaFieldset> */}
                                        <Fieldset legend={"Desenvolvedora:"} data={empresasArray} value={desenvolvedoraEscolhida} onChange={onDesenvolvedoraChanged} onBlur={onNomeEmpresaBlur} ></Fieldset>
                                        <Fieldset legend={"Publicadora:"} data={empresasArray} value={publicadoraEscolhida} onChange={onPublicadoraChanged} onBlur={onNomeEmpresaBlur} ></Fieldset>

                                        <fieldset className="search-filter-fieldset">
                                            <legend>Plataformas:</legend>
                                            <MultiCheckbox checkedValues={plataformasEscolhidas} data={plataformasArray} onChange={onPlataformaChanged}></MultiCheckbox>
                                        </fieldset>

                                        <fieldset className="search-filter-fieldset">
                                            <MultiCheckbox checkedValues={generosEscolhidos} data={generosArray} onChange={onGenerosChanged}></MultiCheckbox>
                                            <legend>Gêneros:</legend>
                                        </fieldset>
                                        <input className="search-filter-submit-button" type="submit" value="Aplicar filtros"></input>
                                    </form>
                                </div>
                            </div>

                            <div className="search-info">
                                <span className="search-info-left">
                                    <span className="search-result-quantidade">{totalItemCount} resultado(s) encontrados</span>
                                </span>
                                <span className="search-info-right">
                                    {/* <label>Ordenação:</label> */}
                                    <select value={sortByParam ?? 'nome'} name="filtro-nome" onChange={onSortByChanged} >
                                        {/* <option value="relevancia">Relevância</option> */}
                                        <option value="nome">Nome</option>
                                        <option value="data">Data</option>
                                    </select>
                                    <select value={sortOrderParam ?? 'asc'} name="filtro-data" onChange={onSortOrderChanged} >
                                        <option value="asc">Crescente</option>
                                        <option value="desc">Decrescente</option>
                                    </select>
                                </span>
                            </div>

                            <SearchResultList jogos={responseData}></SearchResultList>

                            <div className="pagination-control">
                                <button onClick={onPaginationPrevButtonClick} disabled={pageIndex <= 1} >Anterior</button>
                                <span>[Página {pageIndex} de {totalPages}]</span>
                                <button onClick={onPaginationNextButtonClick} disabled={pageIndex >= totalPages}>Próxima</button>
                            </div>
                      </div>
            }
        </main>
    );
}

export default SearchPage;