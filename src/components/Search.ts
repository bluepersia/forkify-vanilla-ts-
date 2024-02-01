import { AppContext } from "../app";
import { IRecipe } from "../models/recipe"
import { apiKey, baseURL } from "../utility";
import ErrorDisplay from "./ErrorDisplay";
import RecipePreview from "./RecipePreview";
import Spinner from "./Spinner";

type State = {
    isLoading: boolean,
    error: Error | null,
    results: IRecipe[],
    page:number
}



export default class Search 
{
    state : State = {
        isLoading: false,
        error: null,
        results: [],
        page: 1
    }
    

    searchForm = document.querySelector<HTMLFormElement> ('.search')!;
    resultsUl = document.querySelector<HTMLUListElement> ('.results')!;
    paginationDiv = document.querySelector<HTMLDivElement>('.pagination')!;

    constructor ()
    {
        this.searchForm.addEventListener ('submit', this.handleSubmit.bind (this));
        this.paginationDiv.addEventListener ('click', this.handlePaginationClick.bind(this));

        AppContext.onChange.push (id => id === 'ACTIVE_ID' ? this.render() : null);
    }

    get totalPages () : number 
    {
        return Math.ceil (this.state.results.length / 10);
    }

    get currentPage () : IRecipe[]
    {
        const endIndex = this.state.page * 10;
        const startIndex = endIndex - 10;

        return this.state.results.slice (startIndex, endIndex);
    }
    
    setPage (page:number) : void 
    {
        if (page > this.totalPages || page < 1)
            return;

        this.state.page = page;
        this.render ();
    }

    handlePaginationClick (e:MouseEvent) : void
    {
        const target = e.target as HTMLElement;

        if (target.closest ('.pagination__btn--prev'))
            this.setPage (this.state.page - 1)
        else if (target.closest ('.pagination__btn--next'))
            this.setPage (this.state.page + 1);
    }


    handleSubmit (e:SubmitEvent) : void
    {
        e.preventDefault ();

        const formData = new FormData (e.target as HTMLFormElement);

        this.search (formData.get ('name') as string);
    }

    async search (name:string) : Promise<void>
    {
        try
        {
            this.state.isLoading = true;
            this.render ();

            const res = await fetch (`${baseURL}?search=${name}&key=${apiKey}`);

            if (!res.ok)
                throw new Error ((await res.json()).message);

            this.state.results = (await res.json()).data.recipes;
        }
        catch (err) 
        {
            this.state.error = err as Error;
        }
        finally
        {
            this.state.isLoading = false;
            this.render ();
        }
    }

    render () : void 
    {
        if (this.state.isLoading)
        {
            this.resultsUl.innerHTML = Spinner ();
            return;
        }

        if (this.state.error)
        {
            this.resultsUl.innerHTML = ErrorDisplay (this.state.error);
            return;
        }

       this.resultsUl.innerHTML = this.currentPage.map (recipe => RecipePreview(recipe)).join ('');

       this.paginationDiv.innerHTML = `${this.state.page > 1 ? `<button class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
         <use href="src/img/icons.svg#icon-arrow-left"></use>
       </svg>
       <span>Page ${this.state.page - 1}</span>
     </button>` : ``}
     ${this.state.page < this.totalPages ? `<button class="btn--inline pagination__btn--next">
       <span>Page ${this.state.page + 1}</span>
       <svg class="search__icon">
         <use href="src/img/icons.svg#icon-arrow-right"></use>
       </svg>
     </button>`: ``} `
    }
}