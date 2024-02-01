import Search from "./components/Search";

type AppContextType = {
    activeId: string,
    setActiveId: (activeId:string) => void
}
export const AppContext: AppContextType = {
    activeId: '',
    setActiveId: function (val:string ) : void
    {
        this.activeId = val;
    }
}

class App 
{
    search = new Search ();

    constructor ()
    {
        document.body.addEventListener ('click', this.handleClick.bind (this));
    }


    handleClick (e:MouseEvent) : void
    {
        const preview = (e.target as HTMLElement).closest<HTMLLIElement> ('.preview');

        if (preview)
        {
            AppContext.setActiveId (preview.dataset.id!);
            this.search.render ();
        }
    }
}

new App ();