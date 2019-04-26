import { Inject, Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LazyLoadService {
  _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};

  loadScript(url: string): Observable<any> {
    if (!url) return;

    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onload = () => {
      this._loadedLibraries[url].next();
      this._loadedLibraries[url].complete();
    };

    document.body.appendChild(script);

    return this._loadedLibraries[url].asObservable();
  }

  loadCss(url: string): Observable<any> {
    if (!url) return;

    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const link: HTMLLinkElement = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    link.onload = () => {
      this._loadedLibraries[url].next();
      this._loadedLibraries[url].complete();
    };

    document.body.appendChild(link);

    return this._loadedLibraries[url].asObservable();
  }
}
