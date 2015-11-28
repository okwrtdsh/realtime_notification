# realtime_notification

```bash
git clone git@github.com:okwrtdsh/realtime_notification.git
cd realtime_notification
npm install
npm start
```

### イメージ?
![seqdiag](http://utils.uci-sys.jp/actdiag?actdiag{
  1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 ->10
  lane browser {
    label = "browser"
    1 [label = "登録・変更"];
    9 [label = "データを受け取る"];
    10 [label = "描画"];
  }
  lane django {
    label = "django server"
    2 [label = "保存処理"];
  }
  lane postgresql {
    label = "postgresql server"
    3 [label = "INSERT OR UPDATE"];
    4 [label = "NOTIFY"];
    7 [label = "SQL VIEW"];
  }
  lane nodejs {
    label = "node.js server"
    5 [label = "LISTEN"];
    6 [label = "viewに問い合わせ"];
    8 [label = "結果をwebsocketでデータを送る"];
  }
})
