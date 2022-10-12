import * as __wml from '@quenk/wml';
import * as __document from '@quenk/wml/lib/dom';
//@ts-ignore: 6192
import {
Maybe as __Maybe,
fromNullable as __fromNullable,
fromArray as __fromArray
}
from '@quenk/noni/lib/data/maybe';
import {Record} from '@quenk/noni/lib/data/record'; ;
import {GridLayout,Row,Column} from '@quenk/wml-widgets/lib/layout/grid'; ;
import {Panel,PanelBody} from '@quenk/wml-widgets/lib/layout/panel'; ;
import {Button} from '@quenk/wml-widgets/lib/control/button'; ;
import {TextField} from '@quenk/wml-widgets/lib/control/text-field'; ;
import {HeadView} from '@devcarib/views/lib/common/head'; 


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
export type Strings = Record<string  > ;;
export interface InviteViewContext{token : string,
failed? : boolean,
message? : string,
errors : Record<string  > ,
values?: {name? : string,
email? : string,
username? : string,
password? : string},
csrfToken : string};
export class InviteView  implements __wml.View {

   constructor(__context: InviteViewContext) {

       this.template = (__this:__wml.Registry) => {

       let values:Record<string  >  = <Record<string  > >(__context.values)

           return __this.node('html', <__wml.Attrs>{'lang': 'en','dir': 'ltr'}, [

        __this.registerView(new HeadView({
 
      'title' : 'Register'
     })).render(),
__this.node('body', <__wml.Attrs>{}, [

        __this.node('form', <__wml.Attrs>{'autocomplete': 'off','action': ('/converse/invites/' + __context.token),'method': 'POST'}, [

        __this.widget(new GridLayout({'id': 'main'}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({'span': 4,'offset': 4}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.node('h1', <__wml.Attrs>{}, [

        __document.createTextNode('User Registration')
     ])
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        ...((__context.failed) ?
(()=>([

        __this.node('div', <__wml.Attrs>{'class': 'ww-alert -error','style': 'text-align:center'}, [

        text (__context.message)
     ])
     ]))() :
(()=>([]))())
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new Panel({}, [

        __this.widget(new PanelBody({}, [

        __this.widget(new TextField({'name': 'name','value': values.name,'label': 'Your Name*','error': __context.errors.name}, [

        
     ]),<__wml.Attrs>{'name': 'name','value': values.name,'label': 'Your Name*','error': __context.errors.name}),
__this.widget(new TextField({'name': 'email','value': values.email,'label': 'Email*','error': __context.errors.email}, [

        
     ]),<__wml.Attrs>{'name': 'email','value': values.email,'label': 'Email*','error': __context.errors.email})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Panel({}, [

        __this.widget(new PanelBody({}, [

        __this.widget(new TextField({'name': 'username','value': values.username,'label': 'Username*','error': __context.errors.username}, [

        
     ]),<__wml.Attrs>{'name': 'username','value': values.username,'label': 'Username*','error': __context.errors.username}),
__this.widget(new TextField({'name': 'password','label': 'Password*','type': 'password','placeholder': '8 characters minimum','error': __context.errors.password}, [

        
     ]),<__wml.Attrs>{'name': 'password','label': 'Password*','type': 'password','placeholder': '8 characters minimum','error': __context.errors.password})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.node('input', <__wml.Attrs>{'type': 'hidden','name': '_csrf','value': __context.csrfToken}, [

        
     ]),
__this.widget(new Button({'type': 'submit','className': '-toolbar-compat -primary -block','text': 'Register'}, [

        
     ]),<__wml.Attrs>{'type': 'submit','className': '-toolbar-compat -primary -block','text': 'Register'})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{'span': 4,'offset': 4})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{'id': 'main'})
     ])
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