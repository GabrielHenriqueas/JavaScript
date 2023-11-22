import React from "react";
import "./TableEv.css";

import editPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";

import { dateFormatDbToView } from "../../../Utils/stringFunctions"

const TableEv = ({ dados, fnUpdate, fnDelete }) => {
  return (
    <table className="table-data">
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Descrição
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Tipo Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Data
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
        </tr>
      </thead>

      <tbody>
        {/* map dos dados */}
        {/* criar um map na variável dados e colocar a linha abaixo dentro do return do map */}
        {dados.map((tp) => {
          return (
            // uma linha completa
            <tr className="table-data__head-row">
              <td className="table-data__data table-data__data--big">
                {tp.nomeEvento}
              </td>
              <td className="table-data__data table-data__data--big">
                {tp.descricao}
              </td>
              <td className="table-data__data table-data__data--big">
                {tp.tiposEvento.titulo}
              </td>
              <td className="table-data__data table-data__data--big">
                {dateFormatDbToView(tp.dataEvento)}
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={editPen}
                  alt=""
                  onClick={() => {
                    fnUpdate(tp.idEvento);
                  }}
                />
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={trashDelete}
                  alt=""
                  onClick={() => {
                    fnDelete(tp.idEvento);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableEv;
