import { State,Action,StateContext,Selector } from '@ngxs/store';
import { LoadPrd, LoadMore, StartSpinner, StopSpinner } from './../actions/prd.actions';
import { LoadService } from '../load.service';
import { state } from '@angular/animations';
import { last, map, tap, take, takeLast } from 'rxjs/operators'

export class PrdStateModel {
    prds : Map<string,Array<any>>;
    docs : Map<string,any>;
    isLoading: boolean;
    isDone : Map<string, boolean>
}

@State<PrdStateModel>({
    name: 'mDB',
    defaults:{
        prds:new Map(),
        docs:new Map(),
        isLoading:true,
        isDone : new Map()
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
            patchState({isLoading:getState().isLoading = false})
            patchState({prds:getState().prds.set(payload.cate,b)})
        })
        da.snapshotChanges().pipe(take(1)).subscribe(v=>{
            if(v.length){
                patchState({isDone:getState().isDone.set(payload.cate,false)})
            }else {
                patchState({isDone:getState().isDone.set(payload.cate,true)})
            }
            patchState({docs:getState().docs.set(payload.cate,v.length? v[v.length-1].payload.doc:null)})
        })
       
    }

    @Action(LoadMore)
    more({getState,patchState}:StateContext<PrdStateModel>,{payload}:LoadMore){
        const doc = getState().docs.get(payload.cate)
        const mo = this.ld.loadmore({key:payload.key, cate:payload.cate, doc:doc})
        mo.valueChanges().pipe(take(1)).subscribe(m=>{
            patchState({isLoading:getState().isLoading = false})
            const n = [...getState().prds.get(payload.cate),...m]
            patchState({prds:getState().prds.set(payload.cate,n)})
        })
        mo.snapshotChanges().pipe(take(1)).subscribe(h=>{
            if(h.length){
                patchState({isDone:getState().isDone.set(payload.cate,false)})
            }else{
                patchState({isDone:getState().isDone.set(payload.cate,true)})
            }
            patchState({docs:getState().docs.set(payload.cate,h.length? h[h.length-1].payload.doc:null)})
        })

    }

    @Action(StartSpinner)
    start({getState,patchState}:StateContext<PrdStateModel>){
        patchState({isLoading:getState().isLoading=true})
    }

    @Action(StopSpinner)
    stop({getState,patchState}:StateContext<PrdStateModel>){
        patchState({isLoading:getState().isLoading=false})
    }

}