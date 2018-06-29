import { State,Action,StateContext,Selector } from '@ngxs/store';
import { LoadPrd,LoadMore } from './../actions/prd.actions';
import { LoadService } from '../load.service';
import { state } from '@angular/animations';
import { last, map, tap, take, takeLast } from 'rxjs/operators'

export class PrdStateModel {
    prds : Map<string,Array<any>>;
    docs : Map<string,any>;
}

@State<PrdStateModel>({
    name: 'mDB',
    defaults:{
        prds:new Map(),
        docs:new Map()
    }
})

export class PrdState {
    constructor(private ld:LoadService){}
    @Selector()
    static getPrds(state:PrdStateModel){
        return state.prds
    }

    @Action(LoadPrd)
    add({getState,patchState}:StateContext<PrdStateModel>,{payload}:LoadPrd){

        const da = this.ld.loadprd(payload)
        da.valueChanges().pipe(take(1)).subscribe(b=>{
            patchState({prds:getState().prds.set(payload.cate,b)})
        })
        da.snapshotChanges().pipe(take(1)).subscribe(v=>{
            patchState({docs:getState().docs.set(payload.cate,v.length? v[v.length-1].payload.doc:null)})
        })
       
    }

    @Action(LoadMore)
    more({getState,patchState}:StateContext<PrdStateModel>,{payload}:LoadMore){
        const doc = getState().docs.get(payload.cate)
        const mo = this.ld.loadmore({key:payload.key, cate:payload.cate, doc:doc})
        mo.valueChanges().pipe(take(1)).subscribe(m=>{
            const n = [...getState().prds.get(payload.cate),...m]
            patchState({prds:getState().prds.set(payload.cate,n)})
        })
        mo.snapshotChanges().pipe(take(1)).subscribe(h=>{
            patchState({docs:getState().docs.set(payload.cate,h.length? h[h.length-1].payload.doc:null)})
        })

    }

}