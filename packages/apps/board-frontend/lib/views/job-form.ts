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
import {Panel,PanelBody,PanelFooter} from '@quenk/wml-widgets/lib/layout/panel'; ;
import {TextField} from '@quenk/wml-widgets/lib/control/text-field'; ;
import {Button} from '@quenk/wml-widgets/lib/control/button'; ;
import {BoardDashboard} from '../main'; 


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


export class JobFormView  implements __wml.View {

   constructor(__context: BoardDashboard) {

       this.template = (__this:__wml.Registry) => {

           return __this.widget(new GridLayout({}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({ww : { 'span' : 8 ,'offset' : 2  }}, [

        __this.widget(new Panel({}, [

        __this.widget(new PanelBody({}, [

        __this.node('form', <__wml.Attrs>{'autocomplete': 'off'}, [

        __this.widget(new TextField({ww : { 'name' : 'title' ,'value' : __context.values.data .title  ,'label' : 'Title' ,'focus' : true  ,'onChange' : __context.values.controls .change   }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : 'title' ,'value' : __context.values.data .title  ,'label' : 'Title' ,'focus' : true  ,'onChange' : __context.values.controls .change   }}),
__this.widget(new TextField({ww : { 'name' : 'country' ,'value' : __context.values.data .country  ,'label' : 'Country' ,'onChange' : __context.values.controls .change   }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : 'country' ,'value' : __context.values.data .country  ,'label' : 'Country' ,'onChange' : __context.values.controls .change   }}),
__this.widget(new TextField({ww : { 'name' : 'city' ,'value' : __context.values.data .city  ,'label' : 'City' ,'onChange' : __context.values.controls .change   }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : 'city' ,'value' : __context.values.data .city  ,'label' : 'City' ,'onChange' : __context.values.controls .change   }}),
__this.widget(new TextField({ww : { 'name' : 'type' ,'value' : __context.values.data .type  ,'label' : 'Type' ,'onChange' : __context.values.controls .change   }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : 'type' ,'value' : __context.values.data .type  ,'label' : 'Type' ,'onChange' : __context.values.controls .change   }}),
__this.widget(new TextField({ww : { 'name' : 'role' ,'value' : __context.values.data .role  ,'label' : 'Role' ,'onChange' : __context.values.controls .change   }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : 'role' ,'value' : __context.values.data .role  ,'label' : 'Role' ,'onChange' : __context.values.controls .change   }}),
__this.widget(new TextField({ww : { 'name' : 'industry' ,'value' : __context.values.data .industry  ,'label' : 'Industry' ,'onChange' : __context.values.controls .change   }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : 'industry' ,'value' : __context.values.data .industry  ,'label' : 'Industry' ,'onChange' : __context.values.controls .change   }}),
__this.widget(new TextField({ww : { 'name' : 'technologies' ,'value' : __context.values.data .technologies  ,'label' : 'Technologies' ,'onChange' : __context.values.controls .change   }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : 'technologies' ,'value' : __context.values.data .technologies  ,'label' : 'Technologies' ,'onChange' : __context.values.controls .change   }}),
__this.widget(new TextField({ww : { 'name' : 'link' ,'value' : __context.values.data .link  ,'label' : 'Link' ,'onChange' : __context.values.controls .change   }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : 'link' ,'value' : __context.values.data .link  ,'label' : 'Link' ,'onChange' : __context.values.controls .change   }}),
__this.widget(new TextField({ww : { 'name' : 'description' ,'value' : __context.values.data .description  ,'label' : 'Description' ,'rows' : 15 ,'onChange' : __context.values.controls .change   }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : 'description' ,'value' : __context.values.data .description  ,'label' : 'Description' ,'rows' : 15 ,'onChange' : __context.values.controls .change   }})
     ])
     ]),<__wml.Attrs>{}),
__this.widget(new PanelFooter({}, [

        __this.widget(new Button({ww : { 'className' : '-primary' ,'text' : 'create' ,'onClick' : __context.values.controls .create   }}, [

        
     ]),<__wml.Attrs>{ww : { 'className' : '-primary' ,'text' : 'create' ,'onClick' : __context.values.controls .create   }})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{ww : { 'span' : 8 ,'offset' : 2  }})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{});

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