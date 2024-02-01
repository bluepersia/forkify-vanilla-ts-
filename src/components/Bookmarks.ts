import { AppContext } from "../app";
import RecipePreview from "./RecipePreview";

export default class Bookmarks 
{

    bookmarksList = document.querySelector<HTMLUListElement> ('.bookmarks__list')!;


    constructor ()
    {
        AppContext.onChange.push (id => id === 'BOOKMARKS' || id === 'ACTIVE_ID' ? this.render () : null);
        
        this.render ();
    }


    render () : void
    {
        if (AppContext.bookmarks.length === 0)
        {
            this.bookmarksList.innerHTML = `<div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>
              No bookmarks yet. Find a nice recipe and bookmark it :)
            </p>
          </div>`
            return;
        }

        this.bookmarksList.innerHTML = AppContext.bookmarks.map (recipe => RecipePreview(recipe)).join ('');
    }
}