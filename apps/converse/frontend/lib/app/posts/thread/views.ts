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
import {PostEditor} from '@devcarib/widgets/lib/post/editor'; ;
import {PostPanel} from '@devcarib/widgets/lib/post/panel'; ;
import {CommentStream} from '@devcarib/widgets/lib/comment/stream'; ;
import {JobRankPanel} from '@devcarib/widgets/lib/job/panel/rank'; ;
import {PostRankPanel} from '@devcarib/widgets/lib/post/panel/rank'; ;
import {EventRankPanel} from '@devcarib/widgets/lib/event/panel/rank'; ;
import {BackButton} from '@devcarib/widgets/lib/control/button/back'; ;
import {PostThread} from '.'; 


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
export class PostThreadView  implements __wml.View {

   constructor(__context: PostThread) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.widget(new GridLayout({}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({'span': 7,'offset': 1}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.node('div', <__wml.Attrs>{'class': "converse-post-thread-header"}, [

        __this.widget(new BackButton({'onClick': __context.values.onBack}, [

        
     ]),<__wml.Attrs>{'onClick': __context.values.onBack}),
__this.node('h4', <__wml.Attrs>{}, [

        __document.createTextNode('Dashboard')
     ])
     ])
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new PostPanel({'editable': (__context.values.post.data.created_by && (__context.values.post.data.created_by.id === __context.app.user.id)),'data': __context.values.post.data,'onEdit': __context.values.post.onEdit}, [

        
     ]),<__wml.Attrs>{'editable': (__context.values.post.data.created_by && (__context.values.post.data.created_by.id === __context.app.user.id)),'data': __context.values.post.data,'onEdit': __context.values.post.onEdit})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new CommentStream({wml : { 'id' : __context.values.comments.id  },'user': __context.app.user.id,'data': __context.values.comments.data,'onEdit': __context.values.comments.onEdit}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : __context.values.comments.id  },'user': __context.app.user.id,'data': __context.values.comments.data,'onEdit': __context.values.comments.onEdit})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new PostEditor({'notitle': true ,'value': __context.values.comment.data,'errors': __context.values.comment.errors,'onChange': __context.values.comment.onChange,'onPost': __context.values.comment.onPost}, [

        
     ]),<__wml.Attrs>{'notitle': true ,'value': __context.values.comment.data,'errors': __context.values.comment.errors,'onChange': __context.values.comment.onChange,'onPost': __context.values.comment.onPost})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{'span': 7,'offset': 1}),
__this.widget(new Column({'span': 3}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new PostRankPanel({wml : { 'id' : __context.values.posts.recent.id  },'title': "Recent Posts",'data': __context.values.posts.recent.data}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : __context.values.posts.recent.id  },'title': "Recent Posts",'data': __context.values.posts.recent.data})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({'className': "-converse-hide-screen-not-small"}, [

        __this.widget(new Column({}, [

        __this.widget(new EventRankPanel({wml : { 'id' : __context.values.events.id  },'data': __context.values.events.data}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : __context.values.events.id  },'data': __context.values.events.data})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{'className': "-converse-hide-screen-not-small"}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new JobRankPanel({wml : { 'id' : __context.values.jobs.id  },'data': __context.values.jobs.data}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : __context.values.jobs.id  },'data': __context.values.jobs.data})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{'span': 3})
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