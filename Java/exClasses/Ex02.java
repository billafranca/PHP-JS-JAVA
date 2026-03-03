package contateste;
import javax.swing.JOptionPane;

public class Conta {
    public double saldo;
    public String nomeCliente;
    public int senha;

    public void senha(double v) {
        int senhaCorreta = 1509;
        boolean sucesso = false;

        for (int tentativas = 1; tentativas <= 3; tentativas++) {
            String entrada = JOptionPane.showInputDialog("Digite a senha para entrar: ");

            if (entrada == null) {
                JOptionPane.showMessageDialog(null, "Operação cancelada.");
                return;
            }

            try {
                senha = Integer.parseInt(entrada);

                if (senha == senhaCorreta) {
                    JOptionPane.showMessageDialog(null, "Login feito com sucesso!");
                    sucesso = true;
                    break;
                } else {
                    JOptionPane.showMessageDialog(null, "Senha não permitida! Tentativa " + tentativas + " de 3.");
                }
            } catch (NumberFormatException e) {
                JOptionPane.showMessageDialog(null, "Digite apenas números");
            }
        }

        if (!sucesso) {
            JOptionPane.showMessageDialog(null, "Número máximo de tentativas atingido. Encerrando.");
        }
    }


    public void sacar(double valor){ 

        if(valor > saldo){
            JOptionPane.showMessageDialog(null, "saldo insuficiente  ");
            
    } else{
            saldo -= valor;
            JOptionPane.showMessageDialog(null, "saque realizado com sucesso  ");
                    }
        }

    public void depositar(double valor){

        if(valor > 2000){
            JOptionPane.showMessageDialog(null, "os depósitos no banco itabú não são permitidos acima de  R$2000 ");
        }
        else {
            saldo += valor;
            JOptionPane.showMessageDialog(null, "depósito realizado com sucesso ");
        }
    }
    
     public void exibirSaldo(){
        JOptionPane.showMessageDialog(null, nomeCliente + ", seu saldo é R$ " + saldo);
     
}
     public void transferir(Conta destino, double valor){


        if(valor > 2000){
            JOptionPane.showMessageDialog(null, "Transferências no Banco itabú não são permitidos acima de  R$2000 ");
        }
        else {
            JOptionPane.showMessageDialog(null, " você realizou uma transferência no valor de: " + valor + "para a conta: " +destino.nomeCliente);
        }
     }


}
    
       