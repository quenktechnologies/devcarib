import * as __wml from '@quenk/wml';
import * as __document from '@quenk/wml/lib/dom';
//@ts-ignore: 6192
import {
Maybe as __Maybe,
fromNullable as __fromNullable,
fromArray as __fromArray
}
from '@quenk/noni/lib/data/maybe';
import {Button} from '@quenk/wml-widgets/lib/control/button'; ;
import {GridLayout,Row,Column} from '@quenk/wml-widgets/lib/layout/grid'; ;
import {Alert} from '@quenk/wml-widgets/lib/dialog/alert'; ;
import {JobPage} from '@board/widgets/lib/page/job-page'; ;
import {JobFormApp} from '../'; 


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
export class PreviewView  implements __wml.View {

   constructor(__context: JobFormApp) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.node('div', <__wml.Attrs>{}, [

        __this.widget(new GridLayout({}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({'span': 8,'offset': 2}, [

        __this.widget(new Alert({'text': "This is a preview, you jos has not been posted yet."}, [

        
     ]),<__wml.Attrs>{'text': "This is a preview, you jos has not been posted yet."})
     ]),<__wml.Attrs>{'span': 8,'offset': 2})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new JobPage({wml : { 'id' : "panel"  },'data': __context.values.job.data}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : "panel"  },'data': __context.values.job.data}),
__this.widget(new GridLayout({}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({'span': 8,'offset': 2}, [

        __this.node('div', <__wml.Attrs>{'class': "action-container"}, [

        __this.widget(new Button({'className': "back-button -default -large",'text': "Back",'onClick': __context.values.buttons.job.click}, [

        
     ]),<__wml.Attrs>{'className': "back-button -default -large",'text': "Back",'onClick': __context.values.buttons.job.click}),
__this.widget(new Button({wml : { 'id' : __context.values.buttons.send.id  },'className': "send-button -primary -large",'text': "Post",'onClick': __context.values.buttons.send.click}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : __context.values.buttons.send.id  },'className': "send-button -primary -large",'text': "Post",'onClick': __context.values.buttons.send.click})
     ])
     ]),<__wml.Attrs>{'span': 8,'offset': 2})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
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