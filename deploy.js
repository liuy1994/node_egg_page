const { readFileSync } = require("fs")
const { Client } = require("ssh2")
const compressing = require("compressing")
const { resolve } = require("path")

// 服务器的nginx存放资源的地址
const servicePath = "/data/www/"
// 本地打包的文件夹目录
const localDist = "dist"
// 本地打包过后的zip文件名 对应nginx配置的root文件夹名称+.zip
const zipFileName = "demo.0218.life.zip"

//
let targetDirName = zipFileName.substring(0, zipFileName.length - 4)

let localDistPath = resolve("./", localDist)

let localZipPath = resolve("./", zipFileName)

let remoteZipPath = servicePath + zipFileName

const comment = [
  `cd ${servicePath}`,
  // 解压zip文件呢
  `unzip -oq -d ${servicePath}${targetDirName}_back ./${zipFileName}`,
  "ls",
  // 删除原来的文件目录
  `rm -rf ${servicePath}${targetDirName}/**`,
  // 重命名解压问价
  `mv ${servicePath}${targetDirName}_back/${localDist}/** ${servicePath}${targetDirName}/`,
  // 删除zip文件
  `sudo rm -f ${servicePath}${zipFileName}`,
  // 删除解压文件夹
  `sudo rm -rf ${servicePath}${targetDirName}_back`,
  // 重置读写权限为755
  `sudo chmod 755 ${servicePath}`,
  // "exit",
  "close",
]

const execShell = (conn, shell, cb) => {
  conn.exec(shell, (err, stream) => {
    if (err) throw err
    stream
      .on("close", (code, signal) => {
        conn.end()
      })
      .on("data", (data) => {
        console.log("STDOUT: " + data)
      })
    cb && cb()
  })
}

const main = () => {
  compressing.zip
    .compressDir(localDistPath, localZipPath)
    .then(() => {
      console.log("文件夹zip完毕")
      createSSH()
    })
    .catch((err) => {
      console.log("文件夹zip出错！", err)
    })
}

const createSSH = () => {
  const conn = new Client()
  conn
    .on("ready", () => {
      console.log("Client :: ready")
      chmod777(conn)
      // execShell(conn, comment.join("\n"))
    })
    .connect({
      host: "43.142.101.138",
      port: 22,
      username: "ubuntu",
      privateKey: readFileSync("C:/Users/admin/.ssh/id_rsa"),
    })
}

const chmod777 = (conn) => {
  conn.exec("sudo chmod 777 " + servicePath, (err, stream) => {
    if (err) throw err
    stream
      .on("close", () => {
        console.log(servicePath + "读写权限修改为777")
      })
      .on("data", function (data) {
        console.log("STDOUT: " + data)
      })
    stream.end()
    uploadFile(conn)
  })
}

const uploadFile = (conn) => {
  conn.sftp((err, sftp) => {
    if (err) throw err
    sftp.fastPut(localZipPath, remoteZipPath, (err) => {
      if (err) throw err
      console.log("文件上传成功")
      // comment.forEach(shell => {
      //   console.log(shell);
      //   execShell(conn, shell)
      // })
      execShell(conn, comment.join("\n"))
    })
  })
}

main()
