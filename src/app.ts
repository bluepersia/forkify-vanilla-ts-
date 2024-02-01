import MainRecipe from "./components/MainRecipe";
import Search from "./components/Search";

type AppContextType = {
    activeId: string,
    setActiveId: (activeId:string) => void,
    onChange:((id:string) => void)[]
}
export const AppContext: AppContextType = {
    activeId: '',
    setActiveId: function (val:string ) : void
    {
        this.activeId = val;
        this.onChange.forEach (el => el('ACTIVE_ID'));
    },
    onChange:[]
}

class App 
{
    search = new Search ();
    mainRecipe = new MainRecipe ();

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