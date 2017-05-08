---
title: "CodeIgniter - Helper de Banco de dados para Adicionar e remover Chaves Estrangeiras"
layout: post
categories: desenvolvimento
image: db_helper.svg
---

Se você trabalha com relacionamentos em tabelas de bancos de dados, principalmente ao utilizar o motor InnoDB no MySQL, com o framework CodeIgniter então esse helper lhe pode ser muito útil.

Copie e cole o código abaixo em um arquivo chamado `db_helper.php` dentro da pasta `helpers` da sua aplicação e carregue-o com autoload ou `$this->load->helper('db')`.

```php
<?php
/**
 * @author   Natan Felles <natanfelles@gmail.com>
 */
defined('BASEPATH') OR exit('No direct script access allowed');
if ( ! function_exists('add_foreign_key'))
{
    /**
     * @param string $table
     * @param string $foreign_key
     * @param string $references
     * @param string $on_delete
     * @param string $on_update
     *
     * @return string SQL command
     */
    function add_foreign_key($table, $foreign_key, $references, $on_delete = 'RESTRICT', $on_update = 'RESTRICT')
    {
        $constraint = "{$table}_{$foreign_key}_fk";
        $sql = "ALTER TABLE {$table} ADD CONSTRAINT {$constraint} FOREIGN KEY ({$foreign_key}) REFERENCES {$references} ON DELETE {$on_delete} ON UPDATE {$on_update}";
        return $sql;
    }
}
if ( ! function_exists('drop_foreign_key'))
{
    /**
     * @param string $table
     * @param string $foreign_key
     *
     * @return string SQL command
     */
    function drop_foreign_key($table, $foreign_key)
    {
        $constraint = "{$table}_{$foreign_key}_fk";
        $sql = "ALTER TABLE {$table} DROP FOREIGN KEY {$constraint}";
        return $sql;
    }
}
```

Você deve usar as funções desse helper dentro de uma query.

Para adicionar Chaves Estrangeiras, faça algo assim:

```php
<?php
$fields = array(
    'id'         => [
        'type'           => 'INT(11)',
        'auto_increment' => TRUE,
    ],
    'user_id'    => [
        'type'     => 'INT(11)',
    ],
);
$this->dbforge->add_field($fields);
$this->dbforge->add_key('id', TRUE);
$this->dbforge->create_table($this->table);
$this->db->query(add_foreign_key($this->table, 'user_id', 'users(id)', 'CASCADE', 'CASCADE'));
```

E para remover as Chaves Estrangeiras, rode a função `drop_foreign_key`:

```php
<?php
$this->db->query(drop_foreign_key($this->table, 'user_id'));
$this->dbforge->drop_table($this->table);
```

É isso, algo simples que poderá lhe ajudar a manter uma melhor integridade no gerenciamento de bancos de dados usando o CodeIgniter.

## Gist

- [https://gist.github.com/natanfelles/4024b598f3b31db47c3e139d82dec281](https://gist.github.com/natanfelles/4024b598f3b31db47c3e139d82dec281){: target="_blank"}

## Sugestão

Admiro, utilizo e contribuo com o projeto [Adminer](https://www.adminer.org){: target="_blank"}, principalmente pela sua interface **completa** e simples de acompanhar a integridade de bancos de dados. Então, se você quiser utilizá-lo, mas não curtir muito a interface padrão, criei uma interface para ele baseada no Twitter Bootstrap 3 e está disponível no [GitHub](https://github.com/natanfelles/adminer-bootstrap-like){: target="_blank"}.

![Adminer Bootstrap-Like]({{ 'assets/img_posts/adminer-bootstrap-like.png' | relative_url }})
