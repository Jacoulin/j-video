// 当前环境：b for broswer, c for client

const env = "c";

let j_video = new Vue({
    el: "#j-video",
    data: {
        played: false,
        currentTime: 0,
        duration: 0
    },
    methods: {
        play: function () {
            if (this.$refs.video.paused) {
                this.played = true;
                // this.currentTime = this.$refs.video.currentTime;
                this.$refs.video.play();
            } else {
                this.played = false;
                this.$refs.video.pause();
            }
        },
        loadedmetadata: function () {
            this.duration = parseInt(this.$refs.video.duration);
        },
        timeupdate: function () {
            this.currentTime = parseInt(this.$refs.video.currentTime);
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

// 窗口控制：c

switch(env){
    case "c":
        let ipc = require('electron').ipcRenderer;
        document.getElementById('btn-min').addEventListener('click', () => {
            ipc.send('window-min');
        });
        document.getElementById('btn-max').addEventListener('click', () => {
            document.getElementById('j-video').style.margin = '0';
            ipc.send('window-max');
        });
        document.getElementById('btn-close').addEventListener('click', () => {
            ipc.send('window-close');
        });
        break;
    case "b":
    default:
        break;
}

