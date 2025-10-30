        function switchTab(tabName) {
            // Скрыть оба контента
            document.getElementById('content-completions').classList.add('hidden');
            document.getElementById('content-specs').classList.add('hidden');

            // Показать нужный
            if (tabName === 'completions') {
                document.getElementById('content-completions').classList.remove('hidden');
                document.getElementById('tab-completions').classList.replace('border-transparent', 'border-black');
                document.getElementById('tab-specs').classList.replace('border-black', 'border-transparent');
            } else if (tabName === 'specs') {
                document.getElementById('content-specs').classList.remove('hidden');
                document.getElementById('tab-specs').classList.replace('border-transparent', 'border-black');
                document.getElementById('tab-completions').classList.replace('border-black', 'border-transparent');
            }
        }