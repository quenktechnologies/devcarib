import * as __wml from '@quenk/wml';
import * as __document from '@quenk/wml/lib/dom';
//@ts-ignore: 6192
import {
Maybe as __Maybe,
fromNullable as __fromNullable,
fromArray as __fromArray
}
from '@quenk/noni/lib/data/maybe';



//@ts-ignore:6192
type __IfArg = ()=>__wml.Content[]

//@ts-ignore:6192
type __ForAlt = ()=> __wml.Content[]

//@ts-ignore:6192
type __ForInBody<A> =(val:A, idx:number, all:A[])=>__wml.Content[]

//@ts-ignore:6192
type __ForOfBody<A> = (val:A, key:string, all:object) =>__wml.Content[]

//@ts-ignore:6192
interface __Record<A> {

 [key:string]: A

}

//@ts-ignore:6192
const __if = (__expr:boolean, __conseq:__IfArg,__alt?:__IfArg) : Content[]=>
(__expr) ? __conseq() :  __alt ? __alt() : [];

//@ts-ignore:6192
const __forIn = <A>(list:A[], f:__ForInBody<A>, alt:__ForAlt) : __wml.Content[] => {

   let ret:__wml.Content[] = [];

   for(let i=0; i<list.length; i++)
       ret = ret.concat(f(list[i], i, list));

   return ret.length === 0 ? alt() : ret;

}
//@ts-ignore:6192
const __forOf = <A>(o:__Record<A>, f:__ForOfBody<A>,alt:__ForAlt) : __wml.Content[] => {

    let ret:__wml.Content[] = [];

    for(let key in o)
  	    if(o.hasOwnProperty(key)) 
	        ret = ret.concat(f((o)[key], key, o));

    return ret.length === 0 ? alt(): ret;

}


// @ts-ignore 6192
const text = __document.text;
// @ts-ignore 6192
const unsafe = __document.unsafe
// @ts-ignore 6192
const isSet = (value:any) => value != null
export interface Meta{property? : string,
name? : string,
content? : string};
export interface HeadViewContext{title : string,
styles? : (string)[],
meta? : (Meta)[]};
export class HeadView  implements __wml.View {

   constructor(__context: HeadViewContext) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.node('head', <__wml.Attrs>{}, [

        __this.node('meta', <__wml.Attrs>{'charset': 'utf-8'}, [

        
     ]),
__this.node('meta', <__wml.Attrs>{'http-equiv': 'X-UA-Compatible','content': unsafe ('IE=edge')}, [

        
     ]),
__this.node('meta', <__wml.Attrs>{'name': 'viewport','content': unsafe ('width=device-width, initial-scale=1.0')}, [

        
     ]),
__this.node('meta', <__wml.Attrs>{'name': 'author','content': 'Caribbean Developers'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'apple-touch-icon','sizes': '57x57','href': '/apple-icon-57x57.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'apple-touch-icon','sizes': '60x60','href': '/apple-icon-60x60.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'apple-touch-icon','sizes': '72x72','href': '/apple-icon-72x72.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'apple-touch-icon','sizes': '76x76','href': '/apple-icon-76x76.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'apple-touch-icon','sizes': '114x114','href': '/apple-icon-114x114.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'apple-touch-icon','sizes': '120x120','href': '/apple-icon-120x120.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'apple-touch-icon','sizes': '144x144','href': '/apple-icon-144x144.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'apple-touch-icon','sizes': '152x152','href': '/apple-icon-152x152.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'apple-touch-icon','sizes': '180x180','href': '/apple-icon-180x180.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'icon','type': 'image/png','sizes': '192x192','href': '/android-icon-192x192.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'icon','type': 'image/png','sizes': '32x32','href': '/favicon-32x32.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'icon','type': 'image/png','sizes': '96x96','href': '/favicon-96x96.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'icon','type': 'image/png','sizes': '16x16','href': '/favicon-16x16.png'}, [

        
     ]),
__this.node('link', <__wml.Attrs>{'rel': 'manifest','href': '/manifest.json'}, [

        
     ]),
__this.node('meta', <__wml.Attrs>{'name': 'msapplication-TileColor','content': '#218c8d'}, [

        
     ]),
__this.node('meta', <__wml.Attrs>{'name': 'msapplication-TileImage','content': '/ms-icon-144x144.png'}, [

        
     ]),
__this.node('meta', <__wml.Attrs>{'name': 'theme-color','content': '#218c8d'}, [

        
     ]),
...(((__context.meta) != null) ?
(()=>([

        ...__forIn (__context.meta, (meta , _$$i, _$$all)=> 
([

        __this.node('meta', <__wml.Attrs>{'property': meta.property,'name': meta.name,'content': meta.content}, [

        
     ])
     ]), 
()=> ([]))
     ]))() :
(()=>([]))()),
__this.node('link', <__wml.Attrs>{'rel': 'stylesheet','href': '/assets/css/site.css'}, [

        
     ]),
...(((__context.styles) != null) ?
(()=>([

        ...__forIn (__context.styles, (style , _$$i, _$$all)=> 
([

        __this.node('link', <__wml.Attrs>{'rel': 'stylesheet','href': style}, [

        
     ])
     ]), 
()=> ([]))
     ]))() :
(()=>([]))()),
__this.node('title', <__wml.Attrs>{}, [

        text (__context.title)
     ])
     ]);

       }

   }

   ids: { [key: string]: __wml.WMLElement } = {};

   groups: { [key: string]: __wml.WMLElement[] } = {};

   views: __wml.View[] = [];

   widgets: __wml.Widget[] = [];

   tree: Node = <Node>__document.createElement('div');

   template: __wml.Template;

   registerView(v:__wml.View) : __wml.View {

       this.views.push(v);

       return v;

}
   register(e:__wml.WMLElement, attrs:__wml.Attributes<any>) : __wml.WMLElement {

       let attrsMap = (<__wml.Attrs><any>attrs)

       if(attrsMap.wml) {

         let {id, group} = attrsMap.wml;

         if(id != null) {

             if (this.ids.hasOwnProperty(id))
               throw new Error(`Duplicate id '${id}' detected!`);

             this.ids[id] = e;

         }

         if(group != null) {

             this.groups[group] = this.groups[group] || [];
             this.groups[group].push(e);

         }

         }
       return e;
}

   node(tag:string, attrs:__wml.Attrs, children: __wml.Content[]): __wml.Content {

       let e = __document.createElement(tag);

       Object.keys(attrs).forEach(key => {

           let value = (<any>attrs)[key];

           if (typeof value === 'function') {

           (<any>e)[key] = value;

           } else if (typeof value === 'string') {

               //prevent setting things like disabled=''
               if (value !== '')
               e.setAttribute(key, value);

           } else if (typeof value === 'boolean') {

             e.setAttribute(key, '');

           } else if(!__document.isBrowser && 
                     value instanceof __document.WMLDOMText) {

             e.setAttribute(key, <any>value);

           }

       });

       children.forEach(c => {

               switch (typeof c) {

                   case 'string':
                   case 'number':
                   case 'boolean':
                     let tn = __document.createTextNode(''+c);
                     e.appendChild(<Node>tn)
                   case 'object':
                       e.appendChild(<Node>c);
                   break;
                   default:
                                throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);

               }})

       this.register(e, attrs);

       return e;

   }


   widget(w: __wml.Widget, attrs:__wml.Attrs) : __wml.Content {

       this.register(w, attrs);

       this.widgets.push(w);

       return w.render();

   }

   findById<E extends __wml.WMLElement>(id: string): __Maybe<E> {

       let mW:__Maybe<E> = __fromNullable<E>(<E>this.ids[id])

       return this.views.reduce((p,c)=>
       p.isJust() ? p : c.findById(id), mW);

   }

   findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]> {

      let mGroup:__Maybe<E[]> =
           __fromArray(this.groups.hasOwnProperty(name) ?
           <any>this.groups[name] : 
           []);

      return this.views.reduce((p,c) =>
       p.isJust() ? p : c.findByGroup(name), mGroup);

   }

   invalidate() : void {

       let {tree} = this;
       let parent = <Node>tree.parentNode;

       if (tree == null)
           return console.warn('invalidate(): '+       'Missing DOM tree!');

       if (tree.parentNode == null)
                  throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');

       parent.replaceChild(<Node>this.render(), tree) 

   }

   render(): __wml.Content {

       this.ids = {};
       this.widgets.forEach(w => w.removed());
       this.widgets = [];
       this.views = [];
       this.tree = <Node>this.template(this);

       this.ids['root'] = (this.ids['root']) ?
       this.ids['root'] : 
       this.tree;

       this.widgets.forEach(w => w.rendered());

       return this.tree;

   }

}