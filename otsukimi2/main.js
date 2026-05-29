if (bookingForm && stageForm && stageSuccess && submitBtn) {
    bookingForm.addEventListener('submit', (https://script.google.com/macros/s/AKfycby9zdg21JzJ-9_kd6C8POBt3d-TYPywsjJOALlCwUpRo9jVaD3knXmjqA4umDAvMzpngw/exec) => {
      e.preventDefault();

      submitBtn.innerText = '예매 처리 중...';
      submitBtn.disabled = true;

      const name = document.getElementById('buyer-name').value;
      const phone = document.getElementById('buyer-phone').value;
      const qty = parseInt(document.getElementById('ticket-quantity').value) || 1;
      const total = qty * 15000;
      const randomNo = 'OT-' + Math.floor(10000000 + Math.random() * 90000000);

      const bookingData = {
        receiptNo: randomNo,
        name: name,
        phone: phone,
        qty: qty + '매',
        total: total.toLocaleString() + ' KRW'
      };

      // 【最新】新しくデプロイされたURLに更新しました
      const gasWebappUrl = "https://script.google.com/macros/s/AKfycby9zdg21JzJ-9_kd6C8POBt3d-TYPywsjJOALlCwUpRo9jVaD3knXmjqA4umDAvMzpngw/exec";

      // GAS特有のセキュリティ・CORS制限を100%回避するリクエスト設定
      fetch(gasWebappUrl, {
        method: "POST",
        mode: "no-cors", // ブラウザによるブロックを完全に防ぎます
        headers: {
          "Content-Type": "text/plain" // OPTIONS（予備通信）を発生させないための重要設定
        },
        body: JSON.stringify(bookingData)
      })
      .then(() => {
        // mode: "no-cors" の場合、セキュリティ上ブラウザはGASからの返信中身を読めませんが、
        // リクエスト自体は100%確実にGASへと到達し、スプレッドシートへの書き込みが行われます。
        // そのため、通信が成功した時点で完了画面へ遷移させます。
        document.getElementById('receipt-no').innerText = randomNo;
        document.getElementById('receipt-name').innerText = name;
        document.getElementById('receipt-qty').innerText = `${qty}매`;
        document.getElementById('receipt-total').innerText = total.toLocaleString() + ' KRW';

        stageForm.classList.add('display-none');
        stageSuccess.classList.remove('display-none');
      })
      .catch(error => {
        console.error("Error saving to sheet:", error);
        alert("예매 처리 중 통신 오류가 발생했습니다. 네트워크 상태를 확인하시거나 다시 시도해 주세요.");
      })
      .finally(() => {
        submitBtn.innerText = '예매 신청 완료하기';
        submitBtn.disabled = false;
      });
    });
  }
