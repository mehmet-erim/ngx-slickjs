import { Inject, Injectable } from "@angular/core";
import { Observable, ReplaySubject, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LazyLoadService {
  _loadedLibraries: { [url: string]: ReplaySubject<void> } = {};

  load(url: string, type: "script" | "style"): Observable<void> {
    if (!url) return of(null);
    const key = url.slice(url.lastIndexOf("/") + 1);

    if (this._loadedLibraries[key]) {
      return this._loadedLibraries[key].asObservable();
    }

    this._loadedLibraries[key] = new ReplaySubject();

    const library = document.createElement(
      type === "script" ? "script" : "link"
    );
    if (type === "script") {
      library.type = "text/javascript";
      (library as HTMLScriptElement).src = url;
    } else {
      library.type = "text/css";
      (library as HTMLLinkElement).rel = "stylesheet";
      (library as HTMLLinkElement).href = url;
    }

    library.onload = () => {
      this._loadedLibraries[key].next();
      this._loadedLibraries[key].complete();
    };

    document.body.appendChild(library);

    return this._loadedLibraries[key].asObservable();
  }
}
