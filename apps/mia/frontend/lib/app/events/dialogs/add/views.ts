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
import {TextField} from '@quenk/wml-widgets/lib/control/text-field'; ;
import {DateField} from '@quenk/wml-widgets/lib/control/date-field'; ;
import {DropList} from '@quenk/wml-widgets/lib/control/drop-list'; ;
import {Label} from '@quenk/wml-widgets/lib/control/label'; ;
import {Checkbox} from '@quenk/wml-widgets/lib/control/checkbox'; ;
import {AddEventDialog} from '.'; 


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
export class AddEventDialogView  implements __wml.View {

   constructor(__context: AddEventDialog) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.widget(new GridLayout({}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new TextField({wml : { 'id' : 'title'  },ww : { 'name' : 'title' ,'label' : 'Title*' ,'error' : __context.values.errors.title ,'value' : __context.values.data.title ,'onChange' : __context.values.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'title'  },ww : { 'name' : 'title' ,'label' : 'Title*' ,'error' : __context.values.errors.title ,'value' : __context.values.data.title ,'onChange' : __context.values.onChange  }})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new Label({}, [

        __document.createTextNode('Starts')
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Column({ww : { 'span' : 8  }}, [

        __this.widget(new DateField({wml : { 'id' : 'startDate'  },ww : { 'className' : 'start-date -block' ,'placeholder' : 'YYYY-MM-DD' ,'name' : 'startDate' ,'value' : __context.values.start.date() ,'onChange' : __context.values.start.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'startDate'  },ww : { 'className' : 'start-date -block' ,'placeholder' : 'YYYY-MM-DD' ,'name' : 'startDate' ,'value' : __context.values.start.date() ,'onChange' : __context.values.start.onChange  }})
     ]),<__wml.Attrs>{ww : { 'span' : 8  }}),
__this.widget(new Column({ww : { 'span' : 4  }}, [

        __this.widget(new DropList({wml : { 'id' : 'startTime'  },ww : { 'name' : 'startTime' ,'className' : 'start-time' ,'value' : __context.values.start.time() ,'options' : __context.values.start.timeOptions ,'onSelect' : __context.values.start.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'startTime'  },ww : { 'name' : 'startTime' ,'className' : 'start-time' ,'value' : __context.values.start.time() ,'options' : __context.values.start.timeOptions ,'onSelect' : __context.values.start.onChange  }})
     ]),<__wml.Attrs>{ww : { 'span' : 4  }})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new Label({}, [

        __document.createTextNode('Ends')
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Column({ww : { 'span' : 8  }}, [

        __this.widget(new DateField({wml : { 'id' : 'endDate'  },ww : { 'className' : 'start-date -block' ,'placeholder' : 'YYYY-MM-DD' ,'name' : 'endDate' ,'value' : __context.values.end.date() ,'onChange' : __context.values.end.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'endDate'  },ww : { 'className' : 'start-date -block' ,'placeholder' : 'YYYY-MM-DD' ,'name' : 'endDate' ,'value' : __context.values.end.date() ,'onChange' : __context.values.end.onChange  }})
     ]),<__wml.Attrs>{ww : { 'span' : 8  }}),
__this.widget(new Column({ww : { 'span' : 4  }}, [

        __this.widget(new DropList({wml : { 'id' : 'endTime'  },ww : { 'name' : 'endTime' ,'className' : 'start-time' ,'value' : __context.values.end.time() ,'options' : __context.values.end.timeOptions ,'onSelect' : __context.values.end.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'endTime'  },ww : { 'name' : 'endTime' ,'className' : 'start-time' ,'value' : __context.values.end.time() ,'options' : __context.values.end.timeOptions ,'onSelect' : __context.values.end.onChange  }})
     ]),<__wml.Attrs>{ww : { 'span' : 4  }}),
__this.widget(new Column({}, [

        __this.widget(new Label({}, [

        __document.createTextNode('All day event? ')
     ]),<__wml.Attrs>{}),
__this.widget(new Checkbox({wml : { 'id' : 'allDay'  },ww : { 'name' : 'allDay' ,'value' : __context.values.data.allDay ,'onChange' : __context.values.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'allDay'  },ww : { 'name' : 'allDay' ,'value' : __context.values.data.allDay ,'onChange' : __context.values.onChange  }})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new TextField({wml : { 'id' : 'host'  },ww : { 'name' : 'host' ,'label' : 'Host' ,'error' : __context.values.errors.host ,'value' : __context.values.data.host ,'onChange' : __context.values.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'host'  },ww : { 'name' : 'host' ,'label' : 'Host' ,'error' : __context.values.errors.host ,'value' : __context.values.data.host ,'onChange' : __context.values.onChange  }})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new TextField({wml : { 'id' : 'location'  },ww : { 'name' : 'location' ,'label' : 'Location' ,'error' : __context.values.errors.location ,'value' : __context.values.data.location ,'onChange' : __context.values.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'location'  },ww : { 'name' : 'location' ,'label' : 'Location' ,'error' : __context.values.errors.location ,'value' : __context.values.data.location ,'onChange' : __context.values.onChange  }})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new TextField({wml : { 'id' : 'url'  },ww : { 'name' : 'url' ,'label' : 'Url' ,'error' : __context.values.errors.url ,'value' : __context.values.data.url ,'onChange' : __context.values.onChange  }}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : 'url'  },ww : { 'name' : 'url' ,'label' : 'Url' ,'error' : __context.values.errors.url ,'value' : __context.values.data.url ,'onChange' : __context.values.onChange  }})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        
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