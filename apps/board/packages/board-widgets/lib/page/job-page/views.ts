import * as __wml from '@quenk/wml';
import * as __document from '@quenk/wml/lib/dom';
//@ts-ignore: 6192
import {
Maybe as __Maybe,
fromNullable as __fromNullable,
fromArray as __fromArray
}
from '@quenk/noni/lib/data/maybe';
import {GridLayout,Row,Column} from '@quenk/wml-widgets/lib/layout/grid'; ;
import {Panel,PanelBody} from '@quenk/wml-widgets/lib/layout/panel'; ;
import {Tag} from '@quenk/wml-widgets/lib/content/tag'; ;
import {Image} from '@quenk/wml-widgets/lib/content/image'; ;
import {timefromnow} from '../../filters'; ;
import {JobPage} from '.'; 


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
export class JobPageView  implements __wml.View {

   constructor(__context: JobPage) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.widget(new GridLayout({'className': "devcarib-job-page"}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({'span': 8,'offset': 2}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({'className': "devcarib-job-page-deets"}, [

        ...(((__context.attrs.data.company_logo) != null) ?
(()=>([

        __this.widget(new Image({'className': "devcarib-job-page-company-logo",'src': __context.attrs.data.company_logo,'alt': "Company Logo"}, [

        
     ]),<__wml.Attrs>{'className': "devcarib-job-page-company-logo",'src': __context.attrs.data.company_logo,'alt': "Company Logo"})
     ]))() :
(()=>([]))()),
__this.node('div', <__wml.Attrs>{'class': "devcarib-job-page-title"}, [

        __this.node('h1', <__wml.Attrs>{}, [

        text (__context.attrs.data.title)
     ]),
...((__context.attrs.data.remote) ?
(()=>([

        __this.widget(new Tag({'text': "Remote",'className': "-success"}, [

        
     ]),<__wml.Attrs>{'text': "Remote",'className': "-success"})
     ]))() :
(()=>([]))())
     ]),
__this.node('div', <__wml.Attrs>{'class': "devcarib-job-page-meta"}, [

        __this.node('div', <__wml.Attrs>{}, [

        __this.node('i', <__wml.Attrs>{'class': "fa-regular fa-building"}, [

        
     ]),
text (__context.attrs.data.company)
     ]),
__this.node('div', <__wml.Attrs>{}, [

        __this.node('i', <__wml.Attrs>{'class': "fa fa-location-pin"}, [

        
     ]),
text (__context.attrs.data.location)
     ]),
__this.node('div', <__wml.Attrs>{}, [

        __this.node('i', <__wml.Attrs>{'class': "fa fa-briefcase"}, [

        
     ]),
text (__context.attrs.data["type"])
     ]),
...((__context.attrs.data.payment_amount) ?
(()=>([

        __this.node('div', <__wml.Attrs>{}, [

        __this.node('i', <__wml.Attrs>{'class': "fa fa-sack-dollar"}, [

        
     ]),
text (__context.attrs.data.payment_amount),
__document.createTextNode('\u00a0\u000a              '),
__this.node('b', <__wml.Attrs>{}, [

        text (__context.attrs.data.payment_currency)
     ]),
__document.createTextNode('\u000a              \u002F\u000a              '),
text (__context.attrs.data.payment_frequency)
     ])
     ]))() :
(()=>([]))()),
__this.node('div', <__wml.Attrs>{'class': "devcarib-job-page-timestamp"}, [

        __this.node('i', <__wml.Attrs>{'class': "fa fa-clock"}, [

        
     ]),
__document.createTextNode('\u000a            Posted '),
text (timefromnow (__context.attrs.data.created_on))
     ])
     ])
     ]),<__wml.Attrs>{'className': "devcarib-job-page-deets"})
     ]),<__wml.Attrs>{}),
...((__context.attrs.data.description_html) ?
(()=>([

        __this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new Panel({}, [

        __this.widget(new PanelBody({'className': "devcarib-job-page-description"}, [

        unsafe (__context.attrs.data.description_html)
     ]),<__wml.Attrs>{'className': "devcarib-job-page-description"})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]))() :
(()=>([]))()),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        ...((__context.attrs.data.apply_url) ?
(()=>([

        __this.node('a', <__wml.Attrs>{'href': __context.attrs.data.apply_url,'class': "ww-button -success -large devcarib-job-page-apply",'target': "_blank"}, [

        __document.createTextNode('Apply')
     ])
     ]))() :
(()=>([]))())
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{'span': 8,'offset': 2})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{'className': "devcarib-job-page"});

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

       let asDOMAttrs = <__document.WMLDOMAttrs><object>attrs

       let e = __document.createElement(tag, asDOMAttrs, children,
                attrs.wml && attrs.wml.ns || '');

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

   findGroupById<E extends __wml.WMLElement>(name: string): E[] {
           return this.groups.hasOwnProperty(name) ?
           <E[]>this.groups[name] : [];

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