import Bookmarks from "./components/Bookmarks";
import MainRecipe from "./components/MainRecipe";
import Search from "./components/Search";
import { IRecipe } from "./models/recipe";

type AppContextType = {
    activeId: string,
    setActiveId: (activeId:string) => void,
    bookmarks:IRecipe[],
    bookmark:(recipe:IRecipe) => void,
    onChange:((id:string) => void)[]
}
export const AppContext: AppContextType = {
    activeId: '',
    setActiveId: function (val:string ) : void
    {
        this.activeId = val;
        this.onChange.forEach (el => el('ACTIVE_ID'));
    },
    bookmarks: [],
    bookmark: function (recipe:IRecipe): void
    {
        if (this.bookmarks.find (bm => bm.id === recipe.id))
            this.bookmarks = this.bookmarks.filter (bm => bm.id !== recipe.id);
        else
            this.bookmarks = [...this.bookmarks, recipe];

        this.onChange.forEach (el => el ('BOOKMARKS'));
    },
    onChange:[]
}

class App 
{
    search = new Search ();
    mainRecipe = new MainRecipe ();
    bookmarks = new Bookmarks ();

    constructor ()
    {
        document.body.addEventListener ('click', this.handleClick.bind (this));
    }


    handleClick (e:MouseEvent) : void
    {
        const preview = (e.target as HTMLElement).closest<HTMLLIElement> ('.preview');

        if (preview)
            AppContext.setActiveId (preview.dataset.id!);
        
    }
}

new App ();