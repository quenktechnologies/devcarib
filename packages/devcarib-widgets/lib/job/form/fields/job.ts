import * as __wml from '@quenk/wml';
import * as __document from '@quenk/wml/lib/dom';
//@ts-ignore: 6192
import {
Maybe as __Maybe,
fromNullable as __fromNullable,
fromArray as __fromArray
}
from '@quenk/noni/lib/data/maybe';
import {Value} from '@quenk/noni/lib/data/jsonx'; ;
import {Event} from '@quenk/wml-widgets/lib/control'; ;
import {GridLayout,Row,Column} from '@quenk/wml-widgets/lib/layout/grid'; ;
import {TextField} from '@quenk/wml-widgets/lib/control/text-field'; ;
import {Option,DropList} from '@quenk/wml-widgets/lib/control/drop-list'; ;
import {Checkbox} from '@quenk/wml-widgets/lib/control/checkbox'; ;
import {CurrencyMoneyTextField} from '@devcarib/widgets/lib/control/input/money'; ;
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
export interface JobFormContext{data : Job,
type: {options : (Option<Value  > )[]},
payment_frequency: {options : (Option<Value  > )[]},
onChange : ($0:Event<Value  > ) => void,
onSelect : ($0:Event<Value  > ) => void};
export class JobFormJobFieldsView  implements __wml.View {

   constructor(__context: JobFormContext) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.widget(new GridLayout({}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new TextField({wml : { 'id' : 'title'  },ww : { 'name' : 'title' ,'label' : 'Title*' ,'placeholder' : 'Example: Fintech Software Engineer Needed' ,'value' : __context.data.title  ,'onChange' : __context.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'title'  },ww : { 'name' : 'title' ,'label' : 'Title*' ,'placeholder' : 'Example: Fintech Software Engineer Needed' ,'value' : __context.data.title  ,'onChange' : __context.onChange  }})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({ww : { 'span' : 6  }}, [

        __this.widget(new TextField({wml : { 'id' : 'location'  },ww : { 'name' : 'location' ,'label' : 'Location*' ,'value' : __context.data.location  ,'onChange' : __context.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'location'  },ww : { 'name' : 'location' ,'label' : 'Location*' ,'value' : __context.data.location  ,'onChange' : __context.onChange  }})
     ]),<__wml.Attrs>{ww : { 'span' : 6  }}),
__this.widget(new Column({ww : { 'span' : 6  }}, [

        __this.node('label', <__wml.Attrs>{'class': 'ww-label'}, [

        __document.createTextNode('Select A Job Type*')
     ]),
__this.widget(new DropList({wml : { 'id' : 'type'  },ww : { 'className' : 'board-job-type-dropdown -block' ,'name' : 'type' ,'value' : __context.data.type  ,'options' : __context.type.options  ,'onSelect' : __context.onSelect  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'type'  },ww : { 'className' : 'board-job-type-dropdown -block' ,'name' : 'type' ,'value' : __context.data.type  ,'options' : __context.type.options  ,'onSelect' : __context.onSelect  }})
     ]),<__wml.Attrs>{ww : { 'span' : 6  }})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new TextField({wml : { 'id' : 'apply_url'  },ww : { 'name' : 'apply_url' ,'label' : 'Apply Link' ,'placeholder' : 'Specify a url or email address applicants can use to apply' ,'value' : __context.data.apply_url  ,'onChange' : __context.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'apply_url'  },ww : { 'name' : 'apply_url' ,'label' : 'Apply Link' ,'placeholder' : 'Specify a url or email address applicants can use to apply' ,'value' : __context.data.apply_url  ,'onChange' : __context.onChange  }})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.node('b', <__wml.Attrs>{}, [

        __document.createTextNode('\u000a         Is this a remote position? \u000a         '),
__this.widget(new Checkbox({ww : { 'name' : 'remote' ,'value' : __context.data.remote  ,'onChange' : __context.onSelect  }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : 'remote' ,'value' : __context.data.remote  ,'onChange' : __context.onSelect  }})
     ])
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({ww : { 'span' : 6  }}, [

        __this.node('b', <__wml.Attrs>{}, [

        __document.createTextNode('Payment')
     ]),
__this.widget(new CurrencyMoneyTextField({'names': [

            'payment_currency',
'payment_amount'
            ],'onChange': __context.onChange}, [

        
     ]),<__wml.Attrs>{'names': [

            'payment_currency',
'payment_amount'
            ],'onChange': __context.onChange})
     ]),<__wml.Attrs>{ww : { 'span' : 6  }}),
__this.widget(new Column({ww : { 'span' : 6  }}, [

        __this.node('label', <__wml.Attrs>{'class': 'ww-label'}, [

        __document.createTextNode('Payment Frequency')
     ]),
__this.widget(new DropList({wml : { 'id' : 'payment_frequency'  },ww : { 'className' : '-block board-job-payment-frequency' ,'name' : 'payment_frequency' ,'value' : __context.data.payment_frequency  ,'options' : __context.payment_frequency.options  ,'onSelect' : __context.onSelect  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'payment_frequency'  },ww : { 'className' : '-block board-job-payment-frequency' ,'name' : 'payment_frequency' ,'value' : __context.data.payment_frequency  ,'options' : __context.payment_frequency.options  ,'onSelect' : __context.onSelect  }})
     ]),<__wml.Attrs>{ww : { 'span' : 6  }})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new TextField({wml : { 'id' : 'description'  },ww : { 'name' : 'description' ,'placeholder' : 'Provide full details of the job. Markdown is supported' ,'rows' : 12 ,'value' : __context.data.description  ,'onChange' : __context.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'description'  },ww : { 'name' : 'description' ,'placeholder' : 'Provide full details of the job. Markdown is supported' ,'rows' : 12 ,'value' : __context.data.description  ,'onChange' : __context.onChange  }})
     ]),<__wml.Attrs>{})
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