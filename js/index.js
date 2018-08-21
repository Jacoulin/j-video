// 当前环境：b for broswer, c for client

const env = "c";

const ipcRenderer = env === 'c' ? require('electron').ipcRenderer : null;

let j_video = new Vue({
    el: "#j-video",
    data: {
        played: false,
        maximized: false,
        currentTime: 0,
        duration: 0
    },
    methods: {
        play: function () {
            if (this.$refs['j-video-screen'].paused) {
                this.played = true;
                this.$refs['j-video-screen'].play();
            } else {
                this.played = false;
                this.$refs['j-video-screen'].pause();
            }
        },
        getDuration: function () {
            this.duration = Math.floor(this.$refs['j-video-screen'].duration);
        },
        getCurrentTime: function () {
            this.currentTime = Math.floor(this.$refs['j-video-screen'].currentTime);
        },
        windowMin: function () {
            if(ipcRenderer !== null){
                ipcRenderer.send('window-min-req');
            }
        },
        windowMax: function () {
            if(ipcRenderer !== null){
                this.maximized = ipcRenderer.sendSync('window-max-req');
            }
        },
        windowClose: function () {
            if(ipcRenderer !== null){
                ipcRenderer.send('window-close-req');
            }
        },
        screenMax: function () {
            j_video_screen.$el.width = 560;
        },
        screenMid: function () {
            j_video_screen.$el.width = 480;
        },
        screenMin: function () {
            j_video_screen.$el.width = 320;
        },
        open: function () {
            temp.$el.click();
        },
        upload: function () {
            // alert(this.$el.files[0]);
            console.log(this.$el.files);
            let file = this.$el.files[0];
            let name = file.name;
            let size = file.size;
            console.log("文件名:" + name + "大小:" + size);

            let reader = new FileReader();

            reader.onload = function () {
                //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
                console.log(this.result);
            }
        }
    }
});


ipcRenderer.on('window-max-req', (event, message) => {
    
});


