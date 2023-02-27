class CountDownTimer{
    #sec = 0;
    #STARTED = false;

    constructor(){
        this.$form = document.getElementById('form-cdt');
        this.$$input = this.$form.querySelectorAll('input[type="number"]');
        this.$btns = document.getElementById('cdt-btns');
        
        this.timer = null;

        this.init();
    }//constructor

    init(){
        this.reset();
        this.$form.addEventListener('submit',this.on_submit);
        this.$btns.addEventListener('click',this.on_click_btns);
    }//init

    /* --- dom --- */
    toggle_ipt_readonly(){
        this.$$input.forEach($input => $input.readOnly = this.#STARTED);
    }//toggle_ipt_readonly

    toggle_stop_start_btn(){
        const $start = document.getElementById('cdt-start');
        const $stop = document.getElementById('cdt-stop');

        $start.disabled = this.#STARTED;
        $stop.disabled = !this.#STARTED;
    }//toggle_stop_start_btn

    /* --- event --- */
    on_submit = e =>{
        e.preventDefault();
        this.#sec = this.get_time();
        if(!this.#sec) return;
        this.#STARTED = true;
        this.toggle_ipt_readonly();
        this.toggle_stop_start_btn();
        setTimeout(()=>{
            this.start_timer();
        },1000);
    }//on_submit

    on_click_btns = e =>{
        if(e.target.tagName != "BUTTON") return;
        switch(e.target.id){
            case "cdt-start" : {
                this.on_submit(e);
            }break;
            case "cdt-stop" : {
                this.stop();
            }break;
            case "cdt-reset" : {
                this.reset();
            }break;
        }//switch
    }//on_click_btns

    stop(){
        this.#STARTED = false;
        this.toggle_stop_start_btn();
        this.toggle_ipt_readonly();

        this.stop_time();
    }//stop

    reset(){
        this.stop();
        this.#sec = 0;
        this.put_time();
    }//reset

    /* --- function --- */
    get_time(){
        const nums = Array
        .prototype.map.call(this.$$input, $input => $input.value);
        const mm = Number(nums[0] + nums[1]) * 60;
        const ss = Number(nums[2] + nums[3]);
        return mm + ss;
    }//get_time

    put_time(){
        const mm = String(parseInt(this.#sec / 60)).padStart(2,"0");
        const ss = String(this.#sec % 60).padStart(2,"0");
        this.$$input[0].value = mm.charAt(0);
        this.$$input[1].value = mm.charAt(1);
        this.$$input[2].value = ss.charAt(0);
        this.$$input[3].value = ss.charAt(1);
    }//put_time

    start_timer = () =>{
        if(!this.#STARTED) return;
        if(this.#sec <= 0){
            this.stop();
            return;
        }
        this.#sec--;
        this.put_time();
        this.timer = setTimeout(this.start_timer, 1000);
    }//start_timer

    stop_time(){
        clearTimeout(this.timer);
        this.timer = null;
    }//stop_time
}//CountDownTimer

new CountDownTimer();