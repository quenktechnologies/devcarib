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
import {Link} from '@quenk/wml-widgets/lib/content/link'; ;
import {DevBar} from '@devcarib/widgets/lib/content/devbar'; ;
import {JobSummaryPanel} from '@devcarib/widgets/lib/panel/job/summary'; ;
import {HeadView} from '@devcarib/views/lib/common/head'; ;
import {Job} from '@board/types/lib/job'; 


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
export interface IndexViewContext{jobs : (Job)[]};
export class IndexView  implements __wml.View {

   constructor(__context: IndexViewContext) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.node('html', <__wml.Attrs>{}, [

        __this.registerView(new HeadView({
 
      'title' : "Jobs For Caribbean Software Developers",
'noSite' : true ,
'styles' : [

            "/assets/css/board.css"
            ]
     })).render(),
__this.node('body', <__wml.Attrs>{}, [

        __this.widget(new DevBar({}, [

        
     ]),<__wml.Attrs>{}),
__this.widget(new GridLayout({'id': "main"}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({'span': 8,'offset': 2}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.node('p', <__wml.Attrs>{'class': "board-post-job-prompt"}, [

        __document.createTextNode('Need talent for a project? \u000a                  '),
__this.widget(new Link({'className': "ww-button -error",'href': "/jobs/post",'text': "Post a Job"}, [

        
     ]),<__wml.Attrs>{'className': "ww-button -error",'href': "/jobs/post",'text': "Post a Job"})
     ])
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        ...__forIn (__context.jobs, (job , _$$i, _$$all)=> 
([

        __this.widget(new JobSummaryPanel({'job': job}, [

        
     ]),<__wml.Attrs>{'job': job})
     ]), 
()=> ([

        __this.node('div', <__wml.Attrs>{'class': "board-no-jobs"}, [

        __this.node('img', <__wml.Attrs>{'src': "/assets/img/sad.svg",'alt': "Sad Face"}, [

        
     ]),
__this.node('h1', <__wml.Attrs>{}, [

        unsafe ("Sorry, This Job Board Is Empty!")
     ]),
__this.node('p', <__wml.Attrs>{}, [

        __document.createTextNode('Jobs posted by recruiters will show up here so check back in a few days.')
     ]),
__this.node('p', <__wml.Attrs>{}, [

        __document.createTextNode('Looking for developers?')
     ]),
__this.widget(new Link({'className': "ww-button -primary",'text': "Post a Job",'href': "/jobs/post"}, [

        
     ]),<__wml.Attrs>{'className': "ww-button -primary",'text': "Post a Job",'href': "/jobs/post"})
     ])
     ]))
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{'span': 8,'offset': 2})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{'id': "main"})
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