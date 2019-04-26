import { Injectable, Inject, Renderer2 } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LazyLoadService {
  _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};

  constructor(private renderer: Renderer2) {}

  loadScript(url: string): Observable<any> {
    if (!url) return;

    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const script = this.renderer.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onload = () => {
      this._loadedLibraries[url].next();
      this._loadedLibraries[url].complete();
    };

    this.renderer.appendChild(document.body, script);

    return this._loadedLibraries[url].asObservable();
  }

  loadCss(url: string): Observable<any> {
    if (!url) return;

    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const link: HTMLLinkElement = this.renderer.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    link.onload = () => {
      this._loadedLibraries[url].next();
      this._loadedLibraries[url].complete();
    };

    this.renderer.appendChild(document.body, link);

    return this._loadedLibraries[url].asObservable();
  }
}
