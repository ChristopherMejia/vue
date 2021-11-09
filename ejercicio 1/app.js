new Vue({
    el : '#app',
    data(){
        return {
            color: '#4caf50',
            courses: [],
            title: '',
            time: 0,
        }
    },

    computed: {
        totalTime() {
            let time = 0;
            this.courses.forEach(element => {
                time += parseInt(element.time); 
            });
            return time;
        }
    },
    methods:{
        addCourse(){
            this.courses.push({ title: this.title, time: this.time });

            console.log({ title: this.title, time: this.time });
           
        }
      }
})